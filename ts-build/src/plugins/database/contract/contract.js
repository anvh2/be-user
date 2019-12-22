"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("../mysql"));
var user_1 = require("../user/user");
var ContractStatus;
(function (ContractStatus) {
    ContractStatus[ContractStatus["Draft"] = 0] = "Draft";
    ContractStatus[ContractStatus["Pending"] = 1] = "Pending";
    ContractStatus[ContractStatus["Approved"] = 2] = "Approved";
    ContractStatus[ContractStatus["Paid"] = 3] = "Paid";
    ContractStatus[ContractStatus["Closed"] = 4] = "Closed";
    ContractStatus[ContractStatus["Refund"] = 5] = "Refund";
    ContractStatus[ContractStatus["Expired"] = 6] = "Expired";
    ContractStatus[ContractStatus["Finished"] = 7] = "Finished";
})(ContractStatus = exports.ContractStatus || (exports.ContractStatus = {}));
var ContractDB = /** @class */ (function () {
    function ContractDB() {
        this.db = mysql_1.default;
        this.tableName = "contract";
    }
    ContractDB.prototype.setContract = function (contract, callback) {
        this.db
            .add(this.tableName, contract)
            .then(function (data) {
            if (data) {
                return callback(null, data);
            }
            return callback(new Error("Set contract failed"));
        })
            .catch(function (err) {
            console.log("[ContractDB][setContract][err]", err);
            return callback(new Error("Set contract failed"));
        });
    };
    ContractDB.prototype.getContract = function (conID, callback) {
        this.db
            .get(this.tableName, "id", conID)
            .then(function (data) {
            if (data) {
                return callback(null, data);
            }
            return callback(new Error("Get contract failed"));
        })
            .catch(function (err) {
            console.log("[ContractDB][getContract][err]", err);
            return callback(new Error("Get Contract failed"));
        });
    };
    ContractDB.prototype.updateContract = function (contract, callback) {
        this.db
            .update(this.tableName, "id", contract)
            .then(function (data) {
            if (data < 0) {
                return callback(new Error("Update database failed"));
            }
            return callback(null, data);
        })
            .catch(function (err) {
            console.log("[ContractDB][updateContract][err]", err);
            return callback(new Error("Update database failed"));
        });
    };
    ContractDB.prototype.getListContract = function (userID, role, offset, limit, callback) {
        if (offset < 0 || limit < 0) {
            return callback(new Error("Offset or limit is incorrect"));
        }
        if (userID < 0 || !isValidRole(role)) {
            return callback(new Error("UserID or role is invalid"));
        }
        var sql = "select * from " + this.tableName;
        if (role == user_1.Role.Tutor) {
            sql += " where tutor_id = " + userID;
        }
        else if (role == user_1.Role.Tutor) {
            sql += " where tutee_id = " + userID;
        }
        sql += " limit " + offset + ", " + limit;
        this.db
            .load(sql)
            .then(function (data) {
            if (!data) {
                return callback(new Error("Get list contract is in correct"));
            }
            if (data.lenght < 0) {
                return callback(new Error("List contract is empty"));
            }
            return callback(null, data);
        })
            .catch(function (err) {
            console.log("[ContractDB][getListContract][err]", err);
            return callback(new Error("Get list contract is incorrect"));
        });
    };
    return ContractDB;
}());
exports.ContractDB = ContractDB;
function isValidRole(role) {
    return !(role != user_1.Role.Tutee && role != user_1.Role.Tutor);
}
