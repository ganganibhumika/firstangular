
import {serializeAs,deserializeAs} from 'cerialize';
export class ResponseWrapperDTO {
    @serializeAs('status')
    @deserializeAs('status')
    private _status: number;

    @serializeAs('message')
    @deserializeAs('message')
    private _message: string;

    @serializeAs('data')
    @deserializeAs('data')
    private _data: object;

    @serializeAs('error')
    @deserializeAs('error')
    private _error: string;
    

    /**
     * Getter status
     * @return {number}
     */
	public get status(): number {
		return this._status;
	}

    /**
     * Getter message
     * @return {string}
     */
	public get message(): string {
		return this._message;
	}

    /**
     * Getter data
     * @return {object}
     */
	public get data(): object {
		return this._data;
	}

    /**
     * Getter error
     * @return {string}
     */
	public get error(): string {
		return this._error;
	}

    /**
     * Setter status
     * @param {number} value
     */
	public set status(value: number) {
		this._status = value;
	}

    /**
     * Setter message
     * @param {string} value
     */
	public set message(value: string) {
		this._message = value;
	}

    /**
     * Setter data
     * @param {object} value
     */
	public set data(value: object) {
		this._data = value;
	}

    /**
     * Setter error
     * @param {string} value
     */
	public set error(value: string) {
		this._error = value;
	}

}