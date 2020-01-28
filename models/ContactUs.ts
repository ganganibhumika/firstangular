import { serializeAs, deserializeAs } from "cerialize";

export class ContactUs {

    @serializeAs('id')
    @deserializeAs('id')
    private _id: string;

    @serializeAs('name')
    @deserializeAs('name')
    private _name: string;

    @serializeAs('email')
    @deserializeAs('email')
    private _email: string;

    @serializeAs('subject')
    @deserializeAs('subject')
    private _subject: string;

    @serializeAs('message')
    @deserializeAs('message')
    private _message: string;

    @serializeAs('idOfUser')
    @deserializeAs('idOfUser')
    private _idOfUser: string;


    /**
     * Getter id
     * @return {string}
     */
	public get id(): string {
		return this._id;
	}

    /**
     * Getter name
     * @return {string}
     */
	public get name(): string {
		return this._name;
	}

    /**
     * Getter email
     * @return {string}
     */
	public get email(): string {
		return this._email;
	}

    /**
     * Getter subject
     * @return {string}
     */
	public get subject(): string {
		return this._subject;
	}

    /**
     * Getter message
     * @return {string}
     */
	public get message(): string {
		return this._message;
	}

    /**
     * Setter id
     * @param {string} value
     */
	public set id(value: string) {
		this._id = value;
	}

    /**
     * Setter name
     * @param {string} value
     */
	public set name(value: string) {
		this._name = value;
	}

    /**
     * Setter email
     * @param {string} value
     */
	public set email(value: string) {
		this._email = value;
	}

    /**
     * Setter subject
     * @param {string} value
     */
	public set subject(value: string) {
		this._subject = value;
	}

    /**
     * Setter message
     * @param {string} value
     */
	public set message(value: string) {
		this._message = value;
	}

    /**
     * Getter idOfUser
     * @return {string}
     */
	public get idOfUser(): string {
		return this._idOfUser;
	}

    /**
     * Setter idOfUser
     * @param {string} value
     */
	public set idOfUser(value: string) {
		this._idOfUser = value;
	}
    

}