/*!
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { CreateRequestBuilder, DeleteRequestBuilder, GetAllRequestBuilder, GetByKeyRequestBuilder, ODataBatchChangeSet, ODataBatchRequestBuilder, UpdateRequestBuilder } from '@sap/cloud-sdk-core';
import { PerEmergencyContacts, PerPhone, PersonKey, PerPersonal, PerSocialAccount, PerPerson, PerPersonRelationship, PerEmail, HrisEmergencyContactAddressDeflt, PerNationalId, PerAddressDeflt } from './index';
/**
 * Batch builder for operations supported on the Sfo Data Service.
 * @param requests The requests of the batch
 * @returns A request builder for batch.
 */
export declare function batch(...requests: Array<ReadSfoDataServiceRequestBuilder | ODataBatchChangeSet<WriteSfoDataServiceRequestBuilder>>): ODataBatchRequestBuilder;
/**
 * Change set constructor consists of write operations supported on the Sfo Data Service.
 * @param requests The requests of the change set
 * @returns A change set for batch.
 */
export declare function changeset(...requests: WriteSfoDataServiceRequestBuilder[]): ODataBatchChangeSet<WriteSfoDataServiceRequestBuilder>;
export declare const defaultSfoDataServicePath = "/sap/opu/odata/sap/SFOData";
export declare type ReadSfoDataServiceRequestBuilder = GetAllRequestBuilder<PerEmergencyContacts> | GetAllRequestBuilder<PerPhone> | GetAllRequestBuilder<PersonKey> | GetAllRequestBuilder<PerPersonal> | GetAllRequestBuilder<PerSocialAccount> | GetAllRequestBuilder<PerPerson> | GetAllRequestBuilder<PerPersonRelationship> | GetAllRequestBuilder<PerEmail> | GetAllRequestBuilder<HrisEmergencyContactAddressDeflt> | GetAllRequestBuilder<PerNationalId> | GetAllRequestBuilder<PerAddressDeflt> | GetByKeyRequestBuilder<PerEmergencyContacts> | GetByKeyRequestBuilder<PerPhone> | GetByKeyRequestBuilder<PersonKey> | GetByKeyRequestBuilder<PerPersonal> | GetByKeyRequestBuilder<PerSocialAccount> | GetByKeyRequestBuilder<PerPerson> | GetByKeyRequestBuilder<PerPersonRelationship> | GetByKeyRequestBuilder<PerEmail> | GetByKeyRequestBuilder<HrisEmergencyContactAddressDeflt> | GetByKeyRequestBuilder<PerNationalId> | GetByKeyRequestBuilder<PerAddressDeflt>;
export declare type WriteSfoDataServiceRequestBuilder = CreateRequestBuilder<PerEmergencyContacts> | UpdateRequestBuilder<PerEmergencyContacts> | DeleteRequestBuilder<PerEmergencyContacts> | CreateRequestBuilder<PerPhone> | UpdateRequestBuilder<PerPhone> | DeleteRequestBuilder<PerPhone> | CreateRequestBuilder<PersonKey> | UpdateRequestBuilder<PersonKey> | DeleteRequestBuilder<PersonKey> | CreateRequestBuilder<PerPersonal> | UpdateRequestBuilder<PerPersonal> | DeleteRequestBuilder<PerPersonal> | CreateRequestBuilder<PerSocialAccount> | UpdateRequestBuilder<PerSocialAccount> | DeleteRequestBuilder<PerSocialAccount> | CreateRequestBuilder<PerPerson> | UpdateRequestBuilder<PerPerson> | DeleteRequestBuilder<PerPerson> | CreateRequestBuilder<PerPersonRelationship> | UpdateRequestBuilder<PerPersonRelationship> | DeleteRequestBuilder<PerPersonRelationship> | CreateRequestBuilder<PerEmail> | UpdateRequestBuilder<PerEmail> | DeleteRequestBuilder<PerEmail> | CreateRequestBuilder<HrisEmergencyContactAddressDeflt> | UpdateRequestBuilder<HrisEmergencyContactAddressDeflt> | DeleteRequestBuilder<HrisEmergencyContactAddressDeflt> | CreateRequestBuilder<PerNationalId> | UpdateRequestBuilder<PerNationalId> | DeleteRequestBuilder<PerNationalId> | CreateRequestBuilder<PerAddressDeflt> | UpdateRequestBuilder<PerAddressDeflt> | DeleteRequestBuilder<PerAddressDeflt>;
//# sourceMappingURL=BatchRequest.d.ts.map