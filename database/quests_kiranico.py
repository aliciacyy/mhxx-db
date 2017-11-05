import requests
import re
import json
import io
from bs4 import BeautifulSoup
from time import sleep
from bs4 import SoupStrainer

def isUsefulTag(tag):
	return tag.name != 'br' and tag.name != 'hr' and tag.text != ''

def isInfoRow(tag):
	return tag.name == 'tr' and tag.parent.name != 'thead'

def extract_quest_info(url):
	sleep(1)
	# print('extracting quest: ' + url)
	quest_info = BeautifulSoup(requests.get(url).content, 'html.parser')
	quest_json = {}

	info_block = quest_info.find('h2').find_parent('div')
	tags = info_block.find_all(isUsefulTag, recursive=False)

	quest_json['titleEn'] = tags[0].text.strip()
	# quest_json['description'] = tags[1].text
	quest_json['location'] = tags[2].find('a').text.strip()
	if len(tags[2].select('span.btn.btn-outline-warning.btn-sm')) > 0:
		quest_json['prowler'] =True
	else:
		quest_json['prowler'] = False
	objective_info = tags[3].find_all('p')
	quest_reward = tags[3].select('div.card-footer.text-muted')

	quest_json['mainObjective'] = objective_info[0].text.strip()
	quest_json['mainReward'] = quest_reward[0].text.strip()
	quest_json['subObjective'] = objective_info[1].text.strip()
	quest_json['subReward'] = quest_reward[1].text.strip()
	quest_json['fail'] = objective_info[2].text.strip()
	quest_json['monsters'] = []

	monster_tag = info_block.find('h5', string=re.compile('Monster'))
	if monster_tag is not None:
		monster_info_list = monster_tag.find_next('div').find_all(isInfoRow)
		for monster_info in monster_info_list:
			quest_json['monsters'].append(extract_monster_data(monster_info))

	quest_json['rewardA'] = []
	quest_json['rewardB'] = []
	quest_json['rewardC'] = []
	quest_json['rewardSub'] = []

	rewards_tag = info_block.find('h5', string=re.compile('Items'))
	if rewards_tag is not None:
		reward_list = rewards_tag.find_next('div').find_all('div', recursive=False)
		if len(reward_list) > 0:
			reward_list_A = reward_list[0].find_all(isInfoRow)
			for reward_info in reward_list_A:
				quest_json['rewardA'].append(extract_reward_data(reward_info))

		if len(reward_list) > 1:
			reward_list_B = reward_list[1].find_all(isInfoRow)
			for reward_info in reward_list_B:
				quest_json['rewardB'].append(extract_reward_data(reward_info))

		if len(reward_list) > 2:
			reward_list_C = reward_list[2].find_all(isInfoRow)
			for reward_info in reward_list_C:
				quest_json['rewardC'].append(extract_reward_data(reward_info))

		if len(reward_list) > 3:
			reward_list_Sub = reward_list[3].find_all(isInfoRow)
			for reward_info in reward_list_Sub:
				quest_json['rewardSub'].append(extract_reward_data(reward_info))
	# print(quest_json)
	return quest_json

def extract_reward_data(reward_info):
	reward_data = {}
	name_info = reward_info.find('td')
	reward_data['nameEn'] = name_info.find('rt').text.strip()
	name_info.find('rt').extract()
	reward_data['nameJa'] = name_info.find('ruby').text.strip()
	name_info.find('a').extract()
	quantity = name_info.text.strip()
	if quantity == '':
		reward_data['quantity'] = 'x1'
	else:
		reward_data['quantity'] = quantity
	reward_data['chance'] = reward_info.find(class_ = 'text-right').text.strip()
	return reward_data

def extract_monster_data(monster_info):
	monster_data = {}
	name_info = monster_info.find('ruby')
	monster_data['nameEn'] = name_info.find('rt').text.strip()
	name_info.find('rt').extract()
	monster_data['nameJa'] = name_info.text.strip()
	monster_data['startArea'] = monster_info.find_all('td')[2].text.strip()
	monster_data['unstable'] = monster_info.find('td').text.strip() != ''
	return monster_data

kiranico_url_en = 'https://mhxxx.kiranico.com'
kiranico_url_ja = 'https://mhxx.kiranico.com'

response = requests.get(kiranico_url_en + '/quest')

quest_rank_ids = ['s1-1', 's1-2', 's1-3', 's1-4', 's1-5', 's1-6', 's1-7', 's1-11', 's1-12', 's1-13', 's1-14']

only_hub_quests = SoupStrainer(id='vendor-2')

hub_quest_info = BeautifulSoup(response.content, 'html.parser', parse_only=only_hub_quests)

quests = []

for id in quest_rank_ids:
	quest_id_info = {}
	quest_id_info['id'] = id
	quest_id_info['rank'] = hub_quest_info.find(href=re.compile('#' + id)).text.strip()
	quest_id_info['questList'] = []
	quest_tags = hub_quest_info.find(id=id).find_all(href=re.compile('/quest/'))
	for tag in quest_tags:
		quest_id_info['questList'].append(extract_quest_info(tag.attrs['href']))
	quests.append(quest_id_info)

print(json.dumps(quests, indent=4))

with io.open('out', 'w', encoding='utf8') as f:
	json.dump(quests, f, ensure_ascii=False, indent=2)
