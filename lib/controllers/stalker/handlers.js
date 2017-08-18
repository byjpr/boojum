import {constantMap} from './constants';

function Handler(context) {
  this.context = context;
  this.debug = this.context.debug;
}

Handler.prototype.start = function(events) {
  // If in array we send the data to
  // the resolver that knows arrays
  if(Array.isArray(events)) {
    return this._resolveArrays(events);
  }

  // Else we assume singleton and send
  // to the singleton resolver
  return this._resolveSignleton(events);
};

Handler.prototype._resolveArrays = function(events) {
  // Because we know the `events` variable is an array
  // of objects, we simply illiterate over them and send
  // each object over to the `_in` function
  events.forEach(( stalkerEvent ) => {
    return this._in(stalkerEvent);
  });
};

Handler.prototype._resolveSignleton = function(stalkerEvent) {
  // Because we know the `events` variable is a single object
  // we send it straight over to the `_in` function
  return this._in(stalkerEvent);
};

Handler.prototype._in = function({action, directory, file}) {
  // Now we have an indevidual NSFW object we can return a Promise
  // and start working on checking it against our ignore lists
  // & if nothing bad happens (reject) then we'll send it off to the
  // `sendNotification` handler which will trigger a Emit.
  return Promise.resolve({action, directory, file})
    .then(this.__ignoredActions)
    .then(this.__ignoredSystemFolders)
    .then(({action, directory, file}) => {
      // If we made it this far without rejecting
      // we can safely assume that we care about this.
      // Use main stalker context to send an emit
      // using the Boojum constants.
      return this.context.emit(action, [directory, file]);
    })
    .catch((e) => {
      console.log(e);
    });
};

// Ignore some actions from NSFW
Handler.prototype.__ignoredActions = function({action, directory, file}) {
  if(action == actions.CREATED) {
    return Promise.reject(
      {
        reason: `The actions type ${constantMap[actions.CREATED]} is ignored by Boojum`,
        action,
        directory,
        file
      }
    );
  }

  return {action, directory, file};
};

// Ignore system folders using regex
// We currently ignore any directory that starts with a `.` dot
Handler.prototype.__ignoredSystemFolders = function({action, directory, file}) {
  let rejection = {
    reason: "", // Default reason
    extra: "See lib/controllers/stalker/handlers.js function Handler.prototype.__ignoredSystemFolders",
    action,
    directory,
    file,
  };

  // Unix hidden folders (`.*`)
  if((/(\/|^|.)\.[^\/\.]/g).test(directory)) {
    return Promise.reject(
      {
        reason: "Hidden directories (.*) are ignored by Boojum by default",
        action,
        directory,
        file
      }
    );
  }

  // Hidden files
  if(file.charAt(0) == '.') {
    return Promise.reject(
      {
        reason: "Files using hidden paths (.*) are ignored by Boojum by default",
        action,
        directory,
        file
      }
    );
  }

  return {action, directory, file};
};

Handler.prototype._sendNotification = function({action, directory, file}) {
  this.context.emit(action, [directory, file]);
};

export default Handler;
