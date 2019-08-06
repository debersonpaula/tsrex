export type IScriptCallback = (
  args: string[],
  basePath: string
) => Promise<any>;

export type IScripts = { [scriptName: string]: IScriptCallback };
