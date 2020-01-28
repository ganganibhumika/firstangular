import { User } from './User';
import { serializeAs, deserializeAs } from 'cerialize';
export class StockOffer {

    @serializeAs('offer')
    @deserializeAs('offer')
    private _offer: number;
    
    @serializeAs('id')
    @deserializeAs('id')
    private _id: number;
    
    @serializeAs('offerQty')
    @deserializeAs('offerQty')
    private _offerQty: number;
    
    @serializeAs('status')
    @deserializeAs('status')
    private _status:string;
    
    @serializeAs('stock_item_id')
    @deserializeAs('stock_item_id')
    private _stock_item_id:string
    
    @serializeAs('userId')
    @deserializeAs('userId')
    private _userId: string;
    
    @serializeAs('order_Id')
    @deserializeAs('order_Id')
    private _order_Id: string;
    
    @serializeAs('createdAt')
    @deserializeAs('createdAt')
    private _createdAt: Date;
    
    @serializeAs('updatedAt')
    @deserializeAs('updatedAt')
    private _updatedAt: Date;
    
    @serializeAs('otherDetail')
    @deserializeAs('otherDetail')
    private _otherDetail: object;
    

    constructor(parameters) {
        
    }

    /**
     * Getter offer
     * @return {number}
     */
	public get offer(): number {
		return this._offer;
	}

    /**
     * Getter offerQty
     * @return {number}
     */
	public get offerQty(): number {
		return this._offerQty;
	}

    /**
     * Getter status
     * @return {string}
     */
	public get status(): string {
		return this._status;
	}

    /**
     * Getter userId
     * @return {string}
     */
	public get userId(): string {
		return this._userId;
	}

    /**
     * Getter order_Id
     * @return {string}
     */
	public get order_Id(): string {
		return this._order_Id;
	}

    /**
     * Getter createdAt
     * @return {Date}
     */
	public get createdAt(): Date {
		return this._createdAt;
	}

    /**
     * Getter updatedAt
     * @return {Date}
     */
	public get updatedAt(): Date {
		return this._updatedAt;
	}

    /**
     * Getter otherDetail
     * @return {object}
     */
	public get otherDetail(): object {
		return this._otherDetail;
	}

    /**
     * Setter offer
     * @param {number} value
     */
	public set offer(value: number) {
		this._offer = value;
	}

    /**
     * Setter offerQty
     * @param {number} value
     */
	public set offerQty(value: number) {
		this._offerQty = value;
	}

    /**
     * Setter status
     * @param {string} value
     */
	public set status(value: string) {
		this._status = value;
	}

    /**
     * Setter userId
     * @param {string} value
     */
	public set userId(value: string) {
		this._userId = value;
	}

    /**
     * Setter order_Id
     * @param {string} value
     */
	public set order_Id(value: string) {
		this._order_Id = value;
	}

    /**
     * Setter createdAt
     * @param {Date} value
     */
	public set createdAt(value: Date) {
		this._createdAt = value;
	}

    /**
     * Setter updatedAt
     * @param {Date} value
     */
	public set updatedAt(value: Date) {
		this._updatedAt = value;
	}

    /**
     * Setter otherDetail
     * @param {object} value
     */
	public set otherDetail(value: object) {
		this._otherDetail = value;
    }
    

    /**
     * Getter id
     * @return {number}
     */
	public get id(): number {
		return this._id;
	}

    /**
     * Setter id
     * @param {number} value
     */
	public set id(value: number) {
		this._id = value;
	}

    
}