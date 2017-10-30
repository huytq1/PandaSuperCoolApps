export class CommunicationSummary {
    id: string = "";
    membershipId: number = null; 
    personId: number = null; 
    recipient: string = "";
    category: string = ""; /* Membership or Person*/
    description: string = "";
    sentOn: Date = null; /* UC0282 - dd/mm/yyyy hh:mm AM/PM format*/
    statusDate: string = "";
    requestedOn: Date = null;
    communicationChannel: string = "";  
}

export class CommunicationDetail extends CommunicationSummary {
    sourceId: string = "";                                          
    source: string = "";
    generatedOn: Date = null;
    status: string = "";
    detail: string = "";
    sentTo: string = "";
    sentBy: string = "";
    isBundled:boolean =false;
    documentList: Array<CommunicationDocument>; 
    statusHistoryList: Array<CommunicationStatus>;
    commDataList: Array<CommunicationData>;

}
export class CommunicationDocument {
    documentId: string = "";
    communicationDocumentName: string = "";
    communicationDocumentMimeType: string = "";
    communicationDocumentLocation: string = "";
    communicationSmsText:string="";
    communicationsDocumentAccessMode: string = "";   /* 0 = Document API call; 1 = External URL; 2 = SMS Text */

}
export class DocumentAccessModeEnum {
    value: string = "";
    Description:string = "";
}



export class CommunicationData {
    key: string = ""; 
    value: number;
    children: Array<CommunicationData>;
}

export class CommunicationStatusEvent {

    eventDate: Date;
    personGivenName: string = "";
    personFamilyName: string = "";
    recipient: string = "";     //PersonGivenName + PersonFamilyName 
    communicationChannel: string;
    eventStatus: string;
    eventStatusDetail: string = "";
}
export class CommunicationStatus extends CommunicationStatusEvent {
    recipient: string = "";
}
export class MergeItem {
    key: string;
    value: number;
    children: Array<MergeItem>;
}