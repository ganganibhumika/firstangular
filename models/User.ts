import { deserializeAs, serializeAs } from "cerialize";
import { AccountManager } from "./AccountManager";
import { Documents } from "./Documents";
import { StockOffer } from "./StockOffer";

export class User {

    @serializeAs('id')
    @deserializeAs('id')
    private _id: string;

    @serializeAs('firstName')
    @deserializeAs('firstName')
    private _firstName: string;

    @serializeAs('lastName')
    @deserializeAs('lastName')
    private _lastName: string;

    @serializeAs('email')
    @deserializeAs('email')
    private _email: string;

    @serializeAs('password')
    @deserializeAs('password')
    private _password: string;

    @serializeAs('mobileNo')
    @deserializeAs('mobileNo')
    private _mobileNo: string;

    @serializeAs('accountManager')
    @deserializeAs('accountManager')
    private _accountManager: AccountManager;

    @serializeAs('idOfAccountManager')
    @deserializeAs('idOfAccountManager')
    private _idOfAccountManager: string;

    @serializeAs('companyType')
    @deserializeAs('companyType')
    private _companyType: string;

    @serializeAs('companyName')
    @deserializeAs('companyName')
    private _companyName: string;

    @serializeAs('companyAddress')
    @deserializeAs('companyAddress')
    private _companyAddress: string;

    @serializeAs('country')
    @deserializeAs('country')
    private _country: string;

    @serializeAs('currency')
    @deserializeAs('currency')
    private _currency: string;

    @serializeAs('registartionNumber')
    @deserializeAs('registartionNumber')
    private _registartionNumber: string;

    @serializeAs('VATNumber')
    @deserializeAs('VATNumber')
    private _VATNumber: string;

    @serializeAs('username')
    @deserializeAs('username')
    private _username: string;

    @serializeAs('status')
    @deserializeAs('status')
    private _status: boolean;

    @serializeAs('oldPassword')
    @deserializeAs('oldPassword')
    private _oldPassword: string;
    
    @serializeAs('orderStatus')
    @deserializeAs('orderStatus')
    private _orderStatus: string;

    @serializeAs('listOfOffer')
    @deserializeAs('listOfOffer')
    private _listOfOffer: Array<StockOffer>;

    private _confirmPassword: string;

    constructor() {
        this.listOfOffer = new Array<StockOffer>();
    }

    // @serializeAs('document')
    @deserializeAs('document')
    private _document: Array<Documents>;

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
     * Getter username
     * @return {string}
     */
    public get username(): string {
        return this._username;
    }

    /**
     * Setter username
     * @param {string} value
     */
    public set username(value: string) {
        this._username = value;
    }

    /**
     * Getter id
     * @return {string}
     */
    public get id(): string {
        return this._id;
    }

    /**
     * Getter firstName
     * @return {string}
     */
    public get firstName(): string {
        return this._firstName;
    }

    /**
     * Getter lastName
     * @return {string}
     */
    public get lastName(): string {
        return this._lastName;
    }

    /**
     * Getter email
     * @return {string}
     */
    public get email(): string {
        return this._email;
    }

    /**
     * Getter password
     * @return {string}
     */
    public get password(): string {
        return this._password;
    }


    /**
     * Getter accountManager
     * @return {AccountManager}
     */
    public get accountManager(): AccountManager {
        return this._accountManager;
    }

    /**
     * Setter accountManager
     * @param {AccountManager} value
     */
    public set accountManager(value: AccountManager) {
        this._accountManager = value;
    }


    /**
     * Getter companyType
     * @return {string}
     */
    public get companyType(): string {
        return this._companyType;
    }

    /**
     * Getter companyName
     * @return {string}
     */
    public get companyName(): string {
        return this._companyName;
    }

    /**
     * Getter companyAddress
     * @return {string}
     */
    public get companyAddress(): string {
        return this._companyAddress;
    }

    /**
     * Getter country
     * @return {string}
     */
    public get country(): string {
        return this._country;
    }

    /**
     * Getter currency
     * @return {string}
     */
    public get currency(): string {
        return this._currency;
    }

    /**
     * Getter registartionNumber
     * @return {string}
     */
    public get registartionNumber(): string {
        return this._registartionNumber;
    }

    /**
     * Getter VATNumber
     * @return {string}
     */
    public get VATNumber(): string {
        return this._VATNumber;
    }

    /**
     * Setter id
     * @param {string} value
     */
    public set id(value: string) {
        this._id = value;
    }

    /**
     * Setter firstName
     * @param {string} value
     */
    public set firstName(value: string) {
        this._firstName = value;
    }

    /**
     * Setter lastName
     * @param {string} value
     */
    public set lastName(value: string) {
        this._lastName = value;
    }

    /**
     * Setter email
     * @param {string} value
     */
    public set email(value: string) {
        this._email = value;
    }

    /**
     * Setter password
     * @param {string} value
     */
    public set password(value: string) {
        this._password = value;
    }


    /**
     * Getter mobileNo
     * @return {string}
     */
    public get mobileNo(): string {
        return this._mobileNo;
    }

    /**
     * Setter mobileNo
     * @param {string} value
     */
    public set mobileNo(value: string) {
        this._mobileNo = value;
    }



    /**
     * Setter companyType
     * @param {string} value
     */
    public set companyType(value: string) {
        this._companyType = value;
    }

    /**
     * Setter companyName
     * @param {string} value
     */
    public set companyName(value: string) {
        this._companyName = value;
    }

    /**
     * Setter companyAddress
     * @param {string} value
     */
    public set companyAddress(value: string) {
        this._companyAddress = value;
    }

    /**
     * Setter country
     * @param {string} value
     */
    public set country(value: string) {
        this._country = value;
    }

    /**
     * Setter currency
     * @param {string} value
     */
    public set currency(value: string) {
        this._currency = value;
    }

    /**
     * Setter registartionNumber
     * @param {string} value
     */
    public set registartionNumber(value: string) {
        this._registartionNumber = value;
    }

    /**
     * Setter VATNumber
     * @param {string} value
     */
    public set VATNumber(value: string) {
        this._VATNumber = value;
    }

    /**
     * Getter idOfAccountManager
     * @return {string}
     */
    public get idOfAccountManager(): string {
        return this._idOfAccountManager;
    }

    /**
     * Setter idOfAccountManager
     * @param {string} value
     */
    public set idOfAccountManager(value: string) {
        this._idOfAccountManager = value;
    }



    /**
     * Getter oldPassword
     * @return {string}
     */
    public get oldPassword(): string {
        return this._oldPassword;
    }

    /**
     * Getter confirmPassword
     * @return {string}
     */
    public get confirmPassword(): string {
        return this._confirmPassword;
    }

    /**
     * Setter oldPassword
     * @param {string} value
     */
    public set oldPassword(value: string) {
        this._oldPassword = value;
    }

    /**
     * Setter confirmPassword
     * @param {string} value
     */
    public set confirmPassword(value: string) {
        this._confirmPassword = value;
    }


    /**
     * Getter document
     * @return {Array<Documents>}
     */
    public get document(): Array<Documents> {
        return this._document;
    }

    /**
     * Setter document
     * @param {Array<Documents>} value
     */
    public set document(value: Array<Documents>) {
        this._document = value;
    }
    /**
     * Getter listOfOffer
     * @return {Array<StockOffer>}
     */
	public get listOfOffer(): Array<StockOffer> {
        return this._listOfOffer;
    }

    /**
     * Setter listOfOffer
     * @param {Array<StockOffer>} value
     */
    public set listOfOffer(value: Array<StockOffer>) {
        this._listOfOffer = value;
    }


    /**
     * Getter orderStatus
     * @return {string}
     */
	public get orderStatus(): string {
		return this._orderStatus;
	}

    /**
     * Setter orderStatus
     * @param {string} value
     */
	public set orderStatus(value: string) {
		this._orderStatus = value;
	}

}

