export interface Emoji {
	slug: string;
	character: string;
	unicodeName: string;
	codePoint: string;
	group: Group;
	subGroup: string;
	variants?: Variant[];
}

export enum Group {
	Activities = 'activities',
	AnimalsNature = 'animals-nature',
	Flags = 'flags',
	FoodDrink = 'food-drink',
	Objects = 'objects',
	PeopleBody = 'people-body',
	SmileysEmotion = 'smileys-emotion',
	Symbols = 'symbols',
	TravelPlaces = 'travel-places',
}

export interface Variant {
	slug: string;
	character: string;
}
