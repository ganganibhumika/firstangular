
export class Pagination {
    private _perPage: String;
    private _selectPage: String;
    private _startPos: number;
    private _noOfRecordsPerPage: number;
    private _totalRecords: number;
    private _goToPageArray: Array<Object>;
    private _lastAchive: boolean;
    private _paginationViewCondition: number;
    private _noOfRecordPerPageArray: Array<Object>;
    private _className: string;
    private _sortColumn: string;
    private _sortBy: string;
    private _searchText: string;

    constructor() {

        this.perPage = "2";
        this.selectPage = "0";
        this.startPos = 0;
        this.noOfRecordsPerPage = Number(this.perPage);
        this.lastAchive = false;
        this.sortBy = 'asc';
        // this.sortColumn = 'grade';

        this.className= 'fa fa-sort-amount-asc';
        this.totalRecords = 0;
        this.goToPageArray = new Array<Object>();
        this.paginationViewCondition = 2;

        this.noOfRecordPerPageArray = [
            {
                "id": "2",
                "name": "2 Record"
            },
            {
                "id": "5",
                "name": "5 Record"
            },
            {
                "id": "10",
                "name": "10 Record"
            },
            {
                "id": "20",
                "name": "20 Record"
            },
            {
                "id": "30",
                "name": "30 Record"
            }
        ];
    }

    public get perPage(): String {
        return this._perPage;
    }

    public set perPage(value: String) {
        this._perPage = value;
    }

    public get selectPage(): String {
        return this._selectPage;
    }

    public set selectPage(value: String) {
        this._selectPage = value;
    }

    public get startPos(): number {
        return this._startPos;
    }

    public set startPos(value: number) {
        this._startPos = value;
    }

    public set noOfRecordsPerPage(value: number) {
        this._noOfRecordsPerPage = value;
    }

    public get noOfRecordsPerPage(): number {
        return this._noOfRecordsPerPage;
    }

    public get totalRecords(): number {
        return this._totalRecords;
    }

    public set totalRecords(value: number) {
        this._totalRecords = value;
    }

    public get goToPageArray(): Array<Object> {
        return this._goToPageArray;
    }

    public set goToPageArray(value: Array<Object>) {
        this._goToPageArray = value;
    }

    public get lastAchive(): boolean {
        return this._lastAchive;
    }

    public set lastAchive(value: boolean) {
        this._lastAchive = value;
    }


    public get paginationViewCondition(): number {
        return this._paginationViewCondition;
    }

    public set paginationViewCondition(value: number) {
        this._paginationViewCondition = value;
    }



    public get noOfRecordPerPageArray(): Array<Object> {
        return this._noOfRecordPerPageArray;
    }

    public set noOfRecordPerPageArray(value: Array<Object>) {
        this._noOfRecordPerPageArray = value;
    }

    /**
     * Getter className
     * @return {string}
     */
    public get className(): string {
        return this._className;
    }

    /**
     * Setter className
     * @param {string} value
     */
    public set className(value: string) {
        this._className = value;
    }


    /**
     * Getter sortColumn
     * @return {string}
     */
    public get sortColumn(): string {
        return this._sortColumn;
    }


    /**
     * Setter sortColumn
     * @param {string} value
     */
    public set sortColumn(value: string) {
        this._sortColumn = value;
    }


    /**
     * Getter sortBy
     * @return {string}
     */
    public get sortBy(): string {
        return this._sortBy;
    }

    /**
     * Setter sortBy
     * @param {string} value
     */
    public set sortBy(value: string) {
        this._sortBy = value;
    }


    /**
     * Getter searchText
     * @return {string}
     */
	public get searchText(): string {
		return this._searchText;
	}

    /**
     * Setter searchText
     * @param {string} value
     */
	public set searchText(value: string) {
		this._searchText = value;
	}

}