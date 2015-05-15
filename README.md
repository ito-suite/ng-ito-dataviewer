#ITO-dataviewer

This is the core Client UI and Logic for asset creation, reading, updating and deleting (CRUD). It includes a number of basic views composed of powerful dynamic jade mixins that *might at some point* be constructed from json at build time - or even dynamically created from template stubs according to currently active scope.


## FEATURES

- socket.io realtime updates
- mobile-ready image uploading from camera with gps functionality
- map based viewing
- infinite scroll viewing
- paged viewing
- html5 audio / video / fs player
- inline editing of ALL editable fields
- json-ld (microformat, rdf-a, dci)
- material design interface

## STATUS

- SO ALPHA, CALLING IT BROKEN WOULD BE BLATANT FLATTERY.

## INSTALLATION

To get involved, please fork the repo and then:

```
$ npm init && bower init && gulp
```

Make a feature branch on your fork and then pull requests against the dev branch. (Unless there is no dev branch, in which case pull against master.)

In an ideal version of this suite, the structure of JSON-LD responses from the API would be crafted such that the interface is created just in time, allowing subtle interface changes over the wire. (Without going too far out on a limb, this could also be seen as an application of constructor theory - in which the data describes its own preferred structural presentation which is then interpreted by "laws" applied by AngularJS.)

This means that all records should be returned from the DB query with metadata like MIME that informs the interpreter (the browser) how the data should be presented in a `<FORM>` and register its callbacks as such. This means that, for example:
 - GEODATA would expect to be placed on a map / lat-long input fields
 - DATETIME would expect to be shown according to browser i10n & changing it would open a DATETIME picker
 - IMAGEURL would expect to be presented within a media tag of the image type
 - TEXT would be presented in an INPUT(TEXT)
 - OPTIONS would be presented in a SELECT

Furthermore, the individual datapoints can have a weight so that they float up (left) or down (right). Of course everything is component-ified, so that the front end presentation algorithm has the freedom to integrate specific things that might be needed (such as a menu) that are too complex to abstract out for each and every edge case. Here is an example of an asset reply from our as yet "fictive" **SUPERAPI**:

```
{"responseHeader":
{"status":0,
"QTime":188},
"response":{"numFound":931,"start":0,"docs":[{
```

### FUTURE

I've been thinking about the ideas of things in boxes and allowing client access to said things, which is really the only job that a content management framework **must** successfully undertake. Here is a textbook example:

User A is a "Manager" and because a "Manager" can edit all data and the requested asset is a collection of data called "spreadsheet" then User A's interface shows the editing functions for this "spreadsheet".

From what I've seen, there are basically three schools of thought regarding content access or restriction:

1. Document-based -> where the document's filesystem has some sort of 'implicit' knowledge of ownership. (like UNIX ls -ld > `chmod`)
2. Role-based -> where access to resources is based upon the classification of user roles. (like unix group - `adduser`)
3. Domain-based -> access to the domain enables access to its assets (like `ssh` type login)

They each have their pros and cons regarding performance and bootstrappable code, but they are similar in several ways:

- passive descriptors used as hooks into some kind of business logic
- they look at the same dataset from various (client) perspectives
- are binary in that the result is a "visible" or "not-visible" asset

In the sense of the ITO Suite, where we are attempting to leverage data-structures into code-generating blocks, I am proposing an access-control system called ´schroedinger-transience´. As the name implies, there is:

- A box
- A label on the box describes its contents
- An object in the box (that may be another box)
- An action that enables opening the box
- An action that enables changing the contents of the box
- An action that closes the box

Perhaps the box can only be opened while being looked at by multiple users. Perhaps it can only be opened on Tuesdays. Perhaps it can only be opened in Hamburg. Perhaps it can only be opened once. Perhaps it can only be opened within 7 days of its creation. Perhaps opening it destroys its contents.

### The metaphor of the three gates.

The first gate is the domain. Without domain access, no other gates can be passed. The second gate is the doorway through which the user has entered the system - as an authenticated user or an anonymous user. The third gate is the item itself.

Opening the box **might** immutably change the content, potentially even destroying it.

**For example:**

One concrete server might be hosting two domains. Let us call these domains "hot" and "cold". There is are two types of domain users, "registered" and "unregistered". Either a user is unregistered at both domains, registered at one of the domains or registered at both domains. When accessing one domain, the registration at the other domain is irrelevant from the perspective of the domain, but not necessarily from the perspective of the user. For the user, these domains might as well be "folders" composed of symlinks. Perhaps there are threads on both the "hot" and the "cold" domains for "beverages". The user we are interested in at the moment is registered at both domains. They upload pictures of coffee to their metadirectory.

However, there are times when an asset can link to multiple places. For example, when looking at an asset, it is imperative that someone participated in the adding of this asset. Perhaps their name is a link to some other group of data. But which group is meant? Does the user want to see their profile, or perhaps other assets of this type by this contributor? Both are valid representations of a set within the dataset, so how can they be determined at runtime? One way would be to use icons, such as the profile icon to link to the contributor's profile, the folder icon to link to similar assets and the envelope icon to send the contributor a message (about this specific asset). But maybe in the future the user on a phone will want to call the contributor (telephone icon) or send the contributor an encrypted self-destructing neural time-series.

This is where json-ld and client capability come into play.

Ultimately the access control system is only one piped position in a flow.

By mixing in both a rules layer and an effect layer in the access control, we can create an abstract method of allowing, preventing, modifying and destroying access to specific data points.

Which means that the asset has transience enabled by the asset owner, and that it has two types of transience enabled, based upon the number of views and a duration. In this case the asset will be purged from the database and FS after one view OR after the passage of 7 days (according to unix time) and then the asset owner(s) will be notified according to their notification preferences.

The constructor consists of conditions and reactions that can be combined at will...

```
REQUEST:
- user     (csrf + other stuff)
- group
- asset(s)
- data

CONDITIONS:

- usercage (role[owner,group,other])
- typecage (NATIVE, WEB, API, TOKEN)
- timecage (within specified timeframe)
- geocage  (geoblocking)

SERVICES:

- deliver  (ACK request with content-laden REPLY)
- notify   (inform user)
- log      (inform server)
- block    (honeypot)
- lock     (change usage )
- iterate  (make new version)
- hide     (move to trash)
- unlink   (delete asset and all associated records)
- suicide  (elevated purge according to specific trigger)

ACCESS -> ITEM -> ACTION
```

## ROADMAP

#### TO DO SYSTEM

- [X] Jade Mixins
- [X] Gulp DEV Watch with Browser Sync
- [ ] Gulp PROD Build for ITO-Suite
- [ ] Tests (basic)
- [ ] Tests (advanced)
- [ ] Tests (distribution ready)
- [ ] Translations
- [ ] json-ld structure


#### TO DO ANGULAR
- [X] Upload Interface
- [X] Translation System
- [ ] Integrate historic code
- [ ] Angular factories and components
- [ ] Restangular integration


#### TO DO STYLE

- [X] Stay in lockstep with angular/material changes
- [ ] write sensible LESS defaults
- [ ] Integrate theme styling
- [ ] ...

