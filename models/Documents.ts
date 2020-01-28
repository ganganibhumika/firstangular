import { serializeAs, deserializeAs } from "cerialize";

export class Documents{

    @serializeAs('id')
    @deserializeAs('id')
    private _id: string;

    @serializeAs('documentName')
    @deserializeAs('documentName')
    private _documentName: string;

    @serializeAs('fileName')
    @deserializeAs('fileName')
    private _fileName: string;
    
    @serializeAs('owner')
    @deserializeAs('owner')
    private _owner: string;


    /**
     * Getter id
     * @return {string}
     */
	public get id(): string {
		return this._id;
	}

    /**
     * Getter documentName
     * @return {string}
     */
	public get documentName(): string {
		return this._documentName;
	}

    /**
     * Getter fileName
     * @return {string}
     */
	public get fileName(): string {
		return this._fileName;
	}

    /**
     * Getter owner
     * @return {string}
     */
	public get owner(): string {
		return this._owner;
	}

    /**
     * Setter id
     * @param {string} value
     */
	public set id(value: string) {
		this._id = value;
	}

    /**
     * Setter documentName
     * @param {string} value
     */
	public set documentName(value: string) {
		this._documentName = value;
	}

    /**
     * Setter fileName
     * @param {string} value
     */
	public set fileName(value: string) {
		this._fileName = value;
	}

    /**
     * Setter owner
     * @param {string} value
     */
	public set owner(value: string) {
		this._owner = value;
	}

}