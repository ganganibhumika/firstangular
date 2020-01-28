import { serializeAs, deserializeAs } from "cerialize";

export class AccountManager {

    @serializeAs('id')
    @deserializeAs('id')
    private _id: string;

    @serializeAs('managerName')
    @deserializeAs('managerName')
    private _managerName: string;

    @serializeAs('status')
    @deserializeAs('status')
    private _status: boolean;
    
    @deserializeAs('totalNoOfRecords')
    @serializeAs('totalNoOfRecords')
    private _totalNoOfRecords: number;


    constructor(){
        this.status = false;
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
     * Getter id
     * @return {string}
     */
	public get id(): string {
		return this._id;
	}

    /**
     * Getter managerName
     * @return {string}
     */
	public get managerName(): string {
		return this._managerName;
	}

    /**
     * Setter id
     * @param {string} value
     */
	public set id(value: string) {
		this._id = value;
	}

    /**
     * Setter managerName
     * @param {string} value
     */
	public set managerName(value: string) {
		this._managerName = value;
	}
    

    /**
     * Getter totalNoOfRecords
     * @return {number}
     */
	public get totalNoOfRecords(): number {
		return this._totalNoOfRecords;
	}

    /**
     * Setter totalNoOfRecords
     * @param {number} value
     */
	public set totalNoOfRecords(value: number) {
		this._totalNoOfRecords = value;
	}
}
