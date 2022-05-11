export interface IEncoder {
  encode: (value: string, salt?: string) => Promise<string>;
  decode: (value: string, valueHash: string) => Promise<boolean>;
}
