export const spanishProviderRouteSlugs=[
  "pragmatic-play","play-n-go","push-gaming","hacksaw-gaming","nolimit-city",
  "netent","relax-gaming","endorphina","bgaming","3-oaks-gaming","wazdan",
  "belatra-games","yggdrasil-gaming","shady-lady","big-time-gaming",
  "clawbuster","onlyplay","mancala-gaming",
] as const;
const ready=new Set<string>(spanishProviderRouteSlugs);
export function hasSpanishProvider(slug:string){return ready.has(slug);}
