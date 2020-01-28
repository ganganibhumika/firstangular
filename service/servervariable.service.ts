
export class ServerVariableService {

    /**user */
    registerUserAPI = 'registerUser';
    userLoginAPI = 'checkEmailAndPassword';
    sendMailOfForgetPasswordAPI = 'sendMailOfForgetPassword';
    checkEmailIsExistOrNotAPI = 'checkEmailIsExistOrNot';
    findAllUserAPI = 'findAllUser';
    uploadDocumentAPI = 'uploadCompanyDocument';
    saveDocumentByUserIdAPI = 'saveDocumentByUserId';
    removeDocumentByIdAPI = 'removeDocumentById';
    findUserByIdAPI = 'findUserById';
    updateUserAPI = 'updateUser';
    uploadMultipleDocumentAPI = 'uploadMultipleDocument';
    changePasswordAPI = 'changePassword';
    downloadFileAPI = 'downloadFile';

    /**account manager */
    updateManagerDetailAPI = 'updateManagerDetail';
    saveManagerDetailAPI = 'saveManagerDetail';
    getAllManagerDetailAPI = 'getAllManagerDetail';
    deleteManagerByIdAPI = 'deleteManagerById';
    changeActiveStatusOfUserAPI = 'changeActiveStatusOfUser';
    getAllManagerDetailForDisplayAPI = 'getAllManagerDetailForDisplay';

    /** site setting */
    getSiteSettingDetailAPI = 'getSiteSettingDetail';
    saveOrUpdateSiteSettingsAPI = 'saveOrUpdateSiteSettings';
    uploadSiteLogoAPI = 'uploadSiteLogo';

    /**contact us */
    saveContactUsDetailAPI = 'saveContactUsDetail';
    getAllContactUsAPI = 'getAllContactUs';
    removeContactUsByIdAPI = 'removeContactUsById';

    /**stock*/
    getAllStockDetailsWithPaginationAPI = 'getAllStockDetailsWithPagination';
    getAllStockOfferByUserAnStatusAPI = 'getAllStockOfferByUserAnStatus';
    getAllModelNameAPI = 'getAllModelName';
    getAllFilterDataAPI = 'getAllFilterData';
    downloadStockListAPI = 'downloadStockList';
    downloadStockOffersAPI = 'downloadStockOffers';
    getAllStockOfferWithUserByStatusAPI = 'getAllStockOfferWithUserByStatus';
    getAllStockOffersByUserIdAndStatusAPI = 'getAllStockOffersByUserIdAndStatus';
    getAllOrdersDetailAPI = 'getAllOrdersDetail';
    getAllOrdersDetailDescriptionAPI = 'getAllOrdersDetailDescription';

    changeStockOfferStatusAPI = 'changeStockOfferStatus';
    sendmailByAdminAPI = 'sendmailByAdmin';




    // mail-template
    saveEmailTemplateAPI = 'saveEmailTemplate';
    updateEmailTemplateAPI = 'updateEmailTemplate';
    getAllEmailTemplateDetailsAPI = 'getAllEmailTemplateDetails';
    deleteEmailTemplateByIdAPI = 'deleteEmailTemplateById';

    //dashboard
    getTotalNoOfRecorsAPI = 'getTotalNoOfRecors';
    makeAnOfferForStockAPI = 'makeAnOfferForStock';
    saveOfferForStockAPI  = 'saveOfferForStock';

}