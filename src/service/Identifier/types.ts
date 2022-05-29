export interface IdentifierType {
  identifier: string;
}

export interface VerifyOtpType extends IdentifierType {
  id?: string;
  otp: string;
}
