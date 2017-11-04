interface Quest {
  title: string,
  listOfQuests: ListOfQuests[]
}

interface ListOfQuests {
  rank: number,
  titleJa: string,
  titleEn: string,
  location: string,
  type: string,
  main: string,
  sub: string,
  rewardA: RewardItem[],
  rewardB: RewardItem[],
  subReward: RewardItem[]
}

interface RewardItem {
  nameJa: string,
  nameEn: string,
  chance: number
}
