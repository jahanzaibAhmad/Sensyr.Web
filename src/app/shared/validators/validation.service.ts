import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }
  public regOnlyAlphabetic = '^(?!\\s)[a-zA-Z_\\s-]*$';
  public regPassword = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$';
  public regAddSpaceCharacterInput = /^(.{3})(.{3})(.{3})(.{4})(.*)$/;
  public regAddSpaceCharacterOutput = '$1 $2 $3 $4 $5';
  public regUserEmail = '[a-zA-Z0-9]+(\\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*(\\.[a-zA-Z]{1,100})';  
  public regGeneralPhone = '[0-9 +]+';
  public regAlphaNumeric = '^[^-\\s][a-zA-Z0-9_\\s-]+$';
  public regEmail = '[a-zA-Z0-9]+(\\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*(\\.[a-zA-Z]{2,3})';
  public regOnlyNumber = '[0-9]+';
  public regAlphaNumWithOutSpcae = '^[a-zA-Z0-9]*$';
  public regCustomAttribute = '^[a-zA-Z0-9:]*$';
  public regAlphaNumWithOutSpcaeDot = '^[a-zA-Z0-9.]*$';
  public regGroupName = '^[^-\\s][a-zA-Z0-9. -]*$';
  public regNoSpaceAndSpecialcChar = '/\\`|\\~|\\!|\\ |\\#|\\$|\\%|\\^|\\&|\\*|\\(|\\)|\\+|\\=|\\[|\\{|\\]|\\}|\\||\\\\|\\\'|\\<|\\,|\\>|\\?|\\/|\\;|\\:|\\s/g';
  public regUserName = '^[a-zA-Z0-9._-]*$';
  public regPhoneNumber = '^[ 0-9()+-]*$';
  public regGeneralField = '^[ A-Za-z0-9_$@./#+-]*$';
  public regSpace = '^\\S+$';

}
