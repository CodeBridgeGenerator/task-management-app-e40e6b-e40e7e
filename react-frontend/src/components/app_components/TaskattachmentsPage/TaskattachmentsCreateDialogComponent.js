import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
      if (Object.hasOwnProperty.call(errorObj.errors, key)) {
        const element = errorObj.errors[key];
        if (element?.message) {
          errMsg[key] = element.message;
        }
      }
    }
    return errMsg.length ? errMsg : errorObj.message ? { error : errorObj.message} : {};
};

const TaskattachmentsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [taskId, setTaskId] = useState([])
const [uploadedBy, setUploadedBy] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [taskId,uploadedBy], setError);
        }
        set_entity({...init});
        setError({});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.taskId)) {
                error["taskId"] = `Task field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.fileName)) {
                error["fileName"] = `File Name field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.fileUrl)) {
                error["fileUrl"] = `File URL field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.uploadedBy)) {
                error["uploadedBy"] = `Uploaded By field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            taskId: _entity?.taskId?._id,fileName: _entity?.fileName,fileUrl: _entity?.fileUrl,uploadedBy: _entity?.uploadedBy?._id,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("taskattachments").create(_data);
        const eagerResult = await client
            .service("taskattachments")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "taskId",
                    service : "tasks",
                    select:["title"]},{
                    path : "uploadedBy",
                    service : "users",
                    select:["email"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Task Attachments updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Task Attachments" });
        }
        setLoading(false);
    };

    

    

    useEffect(() => {
                    // on mount tasks
                    client
                        .service("tasks")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleTasksId } })
                        .then((res) => {
                            setTaskId(res.data.map((e) => { return { name: e['title'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Tasks", type: "error", message: error.message || "Failed get tasks" });
                        });
                }, []);

useEffect(() => {
                    // on mount users
                    client
                        .service("users")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleUsersId } })
                        .then((res) => {
                            setUploadedBy(res.data.map((e) => { return { name: e['email'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Users", type: "error", message: error.message || "Failed get users" });
                        });
                }, []);

    
    
    

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    const taskIdOptions = taskId.map((elem) => ({ name: elem.name, value: elem.value }));
const uploadedByOptions = uploadedBy.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Task Attachments" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "50vw", fontFamily: "Inter, sans-serif", fontSize: "14px", "--cb-font": "Inter, sans-serif", "--cb-size": "14px" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000 cb-appearance" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="taskattachments-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="taskId">Task:</label>
                <Dropdown id="taskId" value={_entity?.taskId?._id} optionLabel="name" optionValue="value" options={taskIdOptions} onChange={(e) => setValByKey("taskId", {_id : e.value})}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["taskId"]) ? (
              <p className="m-0" key="error-taskId">
                {error["taskId"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="fileName">File Name:</label>
                <InputText id="fileName" className="w-full mb-3 p-inputtext-sm" value={_entity?.fileName} onChange={(e) => setValByKey("fileName", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["fileName"]) ? (
              <p className="m-0" key="error-fileName">
                {error["fileName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="fileUrl">File URL:</label>
                <InputText id="fileUrl" className="w-full mb-3 p-inputtext-sm" value={_entity?.fileUrl} onChange={(e) => setValByKey("fileUrl", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["fileUrl"]) ? (
              <p className="m-0" key="error-fileUrl">
                {error["fileUrl"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="uploadedBy">Uploaded By:</label>
                <Dropdown id="uploadedBy" value={_entity?.uploadedBy?._id} optionLabel="name" optionValue="value" options={uploadedByOptions} onChange={(e) => setValByKey("uploadedBy", {_id : e.value})}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["uploadedBy"]) ? (
              <p className="m-0" key="error-uploadedBy">
                {error["uploadedBy"]}
              </p>
            ) : null}
          </small>
            </div>
            <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(TaskattachmentsCreateDialogComponent);
