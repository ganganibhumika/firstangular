import { serializeAs, deserializeAs } from "cerialize";

export class MailTemplate {

     @serializeAs('id')
     @deserializeAs('id')
     private _id: string;

     @serializeAs('status')
     @deserializeAs('status')
     private _status: boolean;

     @serializeAs('templateDescription')
     @deserializeAs('templateDescription')
     private _templateDescription: string;

     @serializeAs('templateName')
     @deserializeAs('templateName')
     private _templateName: string;

     constructor() {
          this.status = false;
     }

     /**
      * Getter id
      * @return {string}
      */
     public get id(): string {
          return this._id;
     }

     /**
      * Setter id
      * @param {string} value
      */
     public set id(value: string) {
          this._id = value;
     }


    /**
     * Getter status
     * @return {boolean}
     */
	public get status(): boolean {
		return this._status;
	}

    /**
     * Setter status
     * @param {boolean} value
     */
	public set status(value: boolean) {
		this._status = value;
	}
   

     /**
      * Getter templateDescription
      * @return {string}
      */
     public get templateDescription(): string {
          return this._templateDescription;
     }

     /**
      * Getter templateName
      * @return {string}
      */
     public get templateName(): string {
          return this._templateName;
     }

     /**
      * Setter templateDescription
      * @param {string} value
      */
     public set templateDescription(value: string) {
          this._templateDescription = value;
     }

     /**
      * Setter templateName
      * @param {string} value
      */
     public set templateName(value: string) {
          this._templateName = value;
     }



}