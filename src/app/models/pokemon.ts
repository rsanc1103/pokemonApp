export class Pokemon {
  id?: number;
  name?: string;
  url?: string;
  types?: { slot: ''; type?: { name?: ''; url?: '' } }[];
  species?: { name?: ''; url?: '' };
  weight?: number;
  height?: number;
  base_experience?: number;
  moves?: { move: { name: string; url: string } }[];

  constructor(name: string, url: string) {
    this.name = name;
    this.url = url;
    this.id = Number(url.split('/').filter(Boolean).pop());
  }
}
