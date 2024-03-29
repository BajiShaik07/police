import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Int "mo:base/Int";
import RBTree "mo:base/RBTree";
import Float "mo:base/Float";
import Time "mo:base/Time";
import Blob "mo:base/Blob";
import Text "mo:base/Text";
import List "mo:base/List";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Debug "mo:base/Debug";
import Buffer "mo:base/Buffer";

actor {

  type Gender = {
    #Male;
    #Female;
  };

  type Fir = {
    id : Text;
    complainantContact : Text;
    complainantName : Text;
    address : Text;
    dateTime : Text;
    location : Text;
    incidentDetails : Text;
    timestamp : Text;
    updates : [(Text, Text)];
    state : Text;
    status :Text;
    district : Text;
  };

  type Police = {
    name : Text;
    dob : Text;
    gender : Gender;
    specialization : Text;
    requests : [Text];
  };

  type User = {
    name : Text;
    dob : Text;
    gender : Gender;
    polices : [Principal];
    noofrecords : Nat;
    requests : [Text];
  };

  type RequestStatus = {
    #Complete;
    #Reject;
    #Accept;
    #Nota;
  };

  type Request = {
    userPrincipal : Principal;
    policePrincipal : Principal;
    expries : Time.Time;
    note : Text;
    status : RequestStatus;
    isEmergency : Bool;
    requestedOn : Time.Time;
  };

  var users = RBTree.RBTree<Principal, User>(Principal.compare);
  var polices = RBTree.RBTree<Principal, Police>(Principal.compare);
  var requests = RBTree.RBTree<Text, Request>(Text.compare);

  // function to create a Police account
  public shared (msg) func createPolice(name : Text, dob : Text, gender : Gender, specialization : Text) : async {
    statusCode : Nat;
    msg : Text;
  } {
    if (not Principal.isAnonymous(msg.caller)) {
      var police = polices.get(msg.caller);
      switch (police) {
        case (null) {
          var user = users.get(msg.caller);
          switch (user) {
            case (null) {
              var police : Police = {
                name = name;
                dob = dob;
                gender = gender;
                specialization = specialization;
                requests = [];
              };
              polices.put(msg.caller, police);
              return {
                statusCode = 200;
                msg = "Registered as Police Successfully.";
              };
            };
            case (?user) {
              return {
                statusCode = 403;
                msg = "A User Account Exists with this Identity";
              };
            };
          };
        };
        case (?user) {
          return {
            statusCode = 403;
            msg = "Police Already Exists with this Identity";
          };
        };
      };
    } else {
      return {
        statusCode = 404;
        msg = "Connect Wallet To Access This Function";
      };
    };
  };

  // function to create a User account
  public shared (msg) func createUser(name : Text, dob : Text, gender : Gender) : async {
    statusCode : Nat;
    msg : Text;
  } {
    if (not Principal.isAnonymous(msg.caller)) {
      var user = users.get(msg.caller);
      switch (user) {
        case (null) {
          var police = polices.get(msg.caller);
          switch (police) {
            case (null) {
              var user : User = {
                name = name;
                dob = dob;
                gender = gender;
                polices = [];
                noofrecords = 0;
                requests = [];
              };
              users.put(msg.caller, user);
              return {
                statusCode = 200;
                msg = "Registered as User Successfully.";
              };
            };
            case (?police) {
              return {
                statusCode = 403;
                msg = "A Police Account Exists with this Identity";
              };
            };
          };
        };
        case (?user) {
          return {
            statusCode = 403;
            msg = "User account Already Exists with this Identity";
          };
        };
      };
    } else {
      return {
        statusCode = 404;
        msg = "Connect Wallet To Access This Function";
      };
    };
  };

  // function to check whether caller has a account or not
  public shared query (msg) func isAccountExists() : async {
    statusCode : Nat;
    msg : Text;
    principal : Principal;
  } {
    if (not Principal.isAnonymous(msg.caller)) {
      var user = users.get(msg.caller);
      switch (user) {
        case (null) {
          var police = polices.get(msg.caller);
          switch (police) {
            case (null) {
              return { statusCode = 200; msg = "null"; principal = msg.caller };
            };
            case (?police) {
              return {
                statusCode = 200;
                msg = "police";
                principal = msg.caller;
              };
            };
          };
        };
        case (?user) {
          return { statusCode = 200; msg = "user"; principal = msg.caller };
        };
      };
    } else {
      return {
        statusCode = 404;
        msg = "Connect Wallet To Access This Function";
        principal = msg.caller;
      };
    };
  };

  public shared query (msg) func getPoliceDetails() : async {
    statusCode : Nat;
    doc : ?Police;
    msg : Text;
  } {
    if (not Principal.isAnonymous(msg.caller)) {
      var police = polices.get(msg.caller);
      switch (police) {
        case (null) {
          return {
            statusCode = 403;
            doc = null;
            msg = "This identity doesn't have any Police Account";
          };
        };
        case (?police) {
          return {
            statusCode = 200;
            doc = ?police;
            msg = "Retrived Police Details Successsfully.";
          };
        };
      };
    } else {
      return {
        statusCode = 404;
        doc = null;
        msg = "Connect Wallet To Access This Function";
      };
    };
  };

  public shared query (msg) func getUserDetails() : async {
    statusCode : Nat;
    user : ?User;
    msg : Text;
  } {
    if (not Principal.isAnonymous(msg.caller)) {
      var user = users.get(msg.caller);
      switch (user) {
        case (null) {
          return {
            statusCode = 403;
            user = null;
            msg = "This identity doesn't have any User Account";
          };
        };
        case (?user) {
          return {
            statusCode = 200;
            user = ?user;
            msg = "Retrived User Details Successsfully.";
          };
        };
      };
    } else {
      return {
        statusCode = 404;
        user = null;
        msg = "Connect Wallet To Access This Function";
      };
    };
  };


//get fir details
var firs : [Fir] = [];

  public shared func submitFir(fir : Fir) : async () {
    firs := Array.append<Fir>(firs, [fir]);
  };

  public shared query func getSingleFir(id : Text) : async ?Fir {
    return Array.find<Fir>(firs, func x = x.id == id);
  };
  public shared query func getSingleFirDistrict(district : Text) : async ?Fir {
    return Array.find<Fir>(firs, func x = x.id == district);
  };

  public shared func addUpdateInFir(id : Text, subject : Text, description : Text) : async {
    statusCode : Nat;
    msg : Text;
  } {
    var fir = Array.find<Fir>(firs, func x = x.id == id);
    switch (fir) {
      case (null) {
        return {
          statusCode = 400;
          msg = "Invalid id was Given.";
        };
      };
      case (?fir) {
        var newFir : Fir = {
          id = fir.id;
          complainantContact = fir.complainantContact;
          complainantName = fir.complainantName;
          address = fir.address;
          dateTime = fir.dateTime;
          location = fir.location;
          incidentDetails = fir.incidentDetails;
          timestamp = fir.timestamp;
          updates = Array.append<(Text, Text)>(fir.updates, Array.make<(Text, Text)>((subject, description)));
          state = fir.state;
          status = fir.status;
          district = fir.district;
        };
        var new_firs = Array.filter<Fir>(firs, func x = x.id != id);
        new_firs := Array.append<Fir>(new_firs, [newFir]);
        firs := new_firs;
        return {
          statusCode = 200;
          msg = "Added Update to fir Successfully.";
        };
      };
    };
  };

  public shared func updateStatusInFir(id : Text, status : Text) : async {
    statusCode : Nat;
    msg : Text;
  } {
    var fir = Array.find<Fir>(firs, func x = x.id == id);
    // Array.append<Text>(doct_req, Array.make<Text>(uuid)) Array.size<Text>(doctor.requests)
    switch (fir) {
      case (null) {
        return {
          statusCode = 400;
          msg = "Invalid id was Given.";
        };
      };
      case (?fir) {
        var newFir : Fir = {
          id = fir.id;
          complainantContact = fir.complainantContact;
          complainantName = fir.complainantName;
          address = fir.address;
          dateTime = fir.dateTime;
          location = fir.location;
          incidentDetails = fir.incidentDetails;
          status = status;
          timestamp = fir.timestamp;
          updates = fir.updates;
          state = fir.state;
          district = fir.district;
        };
        var new_firs = Array.filter<Fir>(firs, func x = x.id != id);
        new_firs := Array.append<Fir>(new_firs, [newFir]);
        firs := new_firs;
        return {
          statusCode = 200;
          msg = "Updated Status in fir Successfully.";
        };
      };
    };
  };
  public shared query func getFirDetails() : async [Fir] {
    return firs;
  };

};