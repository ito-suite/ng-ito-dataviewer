#ITO-dataviewer

This is the core Client UI and Logic for asset creation, reading, updating and deleting (CRUD). It includes a number of basic views composed of powerful dynamic jade mixins that *might at some point* be constructed from json at build time - or even dynamically created from template stubs according to currently active scope.


## FEATURES

- socket.io realtime updates
- mobile-ready image uploading from camera with gps functionality
- map based viewing
- infinite scroll viewing
- paged viewing
- html5 audio / video player
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

Make a feature branch on your fork and make a pull request against the dev branch. (Unless there is no dev branch, in which case pull against master.)


## In an ideal version of this suite, the structure of API JSON-LD responses would be crafted such that the interface is created just in time. This means that all records should be returned from the DB query with metadata like MIME that informs the interpreter (the browser) how the data should be presented in a `<FORM>` and register its callbacks as such. This means that, for example:
 - GEODATA would expect to be placed on a map / lat-long input fields
 - DATETIME would expect to be shown according to browser i10n & changing it would open a DATETIME picker
 - IMAGEURL would expect to be presented within a media tag of the image type
 - TEXT would be presented in an INPUT(TEXT)
 - OPTIONS would be presented in a SELECT
 - ANYTHING with an ACL of "0000" would never be displayed at all.

Furthermore, the individual datapoints can have a weight so that they float up (left) or down (right). Of course everything is component-ified, so that the front end coder has the freedom to integrate specific things that might be needed (such as a menu) that are too complex to abstract out each and every edge case. Here is an example of an asset reply from our as yet "fictive" **SUPERAPI**:

```
{"responseHeader":
{"status":0,
"QTime":188},
"response":{"numFound":931,"start":0,"docs":[{
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

- [ ] write sensible LESS defaults
- [ ] Stay in lockstep with angular/material changes
- [ ] ...

