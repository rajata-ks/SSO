/**
 * Parse profile.
 *
 * Parses user profiles as fetched from Google's People API.
 *
 * The amount of detail in the profile varies based on the scopes granted by the
 * user.  The following scope values add additional data:
 *
 *     `profile` - basic profile information
 *     `email` - email address
 *
 *
 * @param {object|string} json
 * @return {object}
 * @access public
 */
exports.parse = function(json) {
  if ('string' == typeof json) {
    json = JSON.parse(json);
  }

  var profile = {}
    , i, len;
  profile.id = json.resourceName.replace('people/', '');
  if (json.names) {
    for(i = 0, len = json.names.length; i < len; ++i) {
      if (json.names[i].metadata.primary) {
        profile.displayName = json.names[i].displayName;
        profile.familyName = json.names[i].familyName;
        profile.givenName = json.names[i].givenName;
      }
    }
  }
  if (json.emailAddresses) {
    profile.emails = [];
    for (i = 0, len = json.emailAddresses.length; i < len; ++i) {
      profile.emails.push({ value: json.emailAddresses[i].value, primary: json.emailAddresses[i].metadata.primary });
    }
  }
  if (json.photos) {
    profile.photos = [];
    for(i = 0, len = json.photos.length; i < len; ++i) {
      profile.photos.push({ value: json.photos[i].url, primary: json.photos[i].metadata.primary });
    }
  }
  
  return profile;
};
