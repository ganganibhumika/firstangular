import { serializeAs, deserializeAs } from "cerialize";

export class SiteSettings {

    @serializeAs('id')
    @deserializeAs('id')
    private _id: string;

    @serializeAs('siteName')
    @deserializeAs('siteName')

    private _siteName: string;
    @serializeAs('siteEmail')
    @deserializeAs('siteEmail')

    private _siteEmail: string;
    @serializeAs('mobileNo')
    @deserializeAs('mobileNo')
    private _mobileNo: string;

    @serializeAs('currency')
    @deserializeAs('currency')
    private _currency: string;

    @serializeAs('addressLine1')
    @deserializeAs('addressLine1')
    private _addressLine1: string;
   
    @serializeAs('addressLine2')
    @deserializeAs('addressLine2')
    private _addressLine2: string;
   
    @serializeAs('addressLine3')
    @deserializeAs('addressLine3')
    private _addressLine3: string;

    @serializeAs('country')
    @deserializeAs('country')
    private _country: string;

    @serializeAs('offerDiscount')
    @deserializeAs('offerDiscount')
    private _offerDiscount: string;

    @serializeAs('logo')
    @deserializeAs('logo')
    private _logo: string;

    /**
     * Getter logo
     * @return {string}
     */
    public get logo(): string {
        return this._logo;
    }

    /**
     * Setter logo
     * @param {string} value
     */
    public set logo(value: string) {
        this._logo = value;
    }

    /**
     * Getter id
     * @return {string}
     */
    public get id(): string {
        return this._id;
    }

    /**
     * Getter siteName
     * @return {string}
     */
    public get siteName(): string {
        return this._siteName;
    }

    /**
     * Getter siteEmail
     * @return {string}
     */
    public get siteEmail(): string {
        return this._siteEmail;
    }

    /**
     * Getter mobileNo
     * @return {string}
     */
    public get mobileNo(): string {
        return this._mobileNo;
    }

    /**
     * Getter currency
     * @return {string}
     */
    public get currency(): string {
        return this._currency;
    }

    /**
     * Getter country
     * @return {string}
     */
    public get country(): string {
        return this._country;
    }

    /**
     * Setter id
     * @param {string} value
     */
    public set id(value: string) {
        this._id = value;
    }

    /**
     * Setter siteName
     * @param {string} value
     */
    public set siteName(value: string) {
        this._siteName = value;
    }

    /**
     * Setter siteEmail
     * @param {string} value
     */
    public set siteEmail(value: string) {
        this._siteEmail = value;
    }

    /**
     * Setter mobileNo
     * @param {string} value
     */
    public set mobileNo(value: string) {
        this._mobileNo = value;
    }

    /**
     * Setter currency
     * @param {string} value
     */
    public set currency(value: string) {
        this._currency = value;
    }

    /**
     * Setter country
     * @param {string} value
     */
    public set country(value: string) {
        this._country = value;
    }

    /**
     * Getter offerDiscount
     * @return {string}
     */
    public get offerDiscount(): string {
        return this._offerDiscount;
    }

    /**
     * Setter offerDiscount
     * @param {string} value
     */
    public set offerDiscount(value: string) {
        this._offerDiscount = value;
    }


    /**
     * Getter addressLine1
     * @return {string}
     */
	public get addressLine1(): string {
		return this._addressLine1;
	}

    /**
     * Getter addressLine2
     * @return {string}
     */
	public get addressLine2(): string {
		return this._addressLine2;
	}

    /**
     * Getter addressLine3
     * @return {string}
     */
	public get addressLine3(): string {
		return this._addressLine3;
	}

    /**
     * Setter addressLine1
     * @param {string} value
     */
	public set addressLine1(value: string) {
		this._addressLine1 = value;
	}

    /**
     * Setter addressLine2
     * @param {string} value
     */
	public set addressLine2(value: string) {
		this._addressLine2 = value;
	}

    /**
     * Setter addressLine3
     * @param {string} value
     */
	public set addressLine3(value: string) {
		this._addressLine3 = value;
	}

}