export interface Data {
  info: Info;
  results: ICharacter[];
}

export interface Info {
  count: number;
  pages: number;
  next: string;
  prev: null;
}

export interface ICharacter {
  names: Name[];
  abilities: Ability[];
  height: number;
  id: number;
  order: number;
  name: string;
  types: Type[];
  sprites: Sprites;
  weight: number;
}

export interface Name {
  language: Language3
  name: string
}

export interface Language3 {
  name: string
  url: string
}

export interface Ability {
  ability: Ability2
  is_hidden: boolean
  slot: number
}

export interface Ability2 {
  name: string
  url: string
}

export interface Type {
  slot: number; // Incluye la propiedad que faltaba
  type: {
    name: string;
  };
}

export interface Sprites {
  front_default: string;
  back_default: string;
  other: Other;
}

export interface Other {
  'official-artwork': OfficialArtwork;
}

export interface OfficialArtwork {
  front_default: URL;
}