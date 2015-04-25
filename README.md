#ITO-dataviewer

This is the core Client UI and Logic for asset creation, reading, updating and deleting (CRUD). It includes a number of basic views composed of powerful dynamic jade mixins that *might at some point* be constructed from json at build time.


## FEATURES

- socket.io realtime updates
- mobile-ready image uploading from camera with gps functionality
- map based viewing
- infinite scroll viewing
- paged viewing
- html5 audio / video player
- inline editing of ALL editable fields
- json-ld (microformat, rdf-a, dci)


## STATUS

- SO ALPHA, CALLING IT BROKEN WOULD BE BLATANT FLATTERY.

## INSTALLATION

To get involved, please fork the repo and then:

```
$ npm init && bower init && gulp
```

Make a feature branch on your fork and make a pull request against the dev branch. (Unless there is no dev branch, in which case pull against master.)



## ROADMAP

#### TO DO SYSTEM

- [X] Jade Mixins
- [X] Gulp DEV Watch with Browser Sync
- [ ] Gulp PROD Build for ITO-Suite
- [ ] Jade builder from JSON
- [ ] Tests (basic)
- [ ] Tests (advanced)
- [ ] Tests (distribution ready)
- [ ] Translations
- [ ] json-ld structure


#### TO DO ANGULAR

- [ ] Integrate historic code
- [ ] Angular factories and components
- [ ] Restangular integration
- [ ] i18n directive


#### TO DO STYLE

- [ ] write sensible LESS defaults
- [ ] ...

