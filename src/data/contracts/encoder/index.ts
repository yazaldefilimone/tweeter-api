export interface IEncoder {
  encode: (value: string, salt?: number) => Promise<string>;
  decode: (value: string, valueHash: string) => Promise<boolean>;
}
