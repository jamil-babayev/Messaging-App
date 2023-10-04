/* eslint-disable @typescript-eslint/no-unused-expressions */
type Request = {
  _id?: string;
  received?: string;
  sended: string;
  sendedAt: Date;
  verified: boolean;
}[];

export default Request;
