# bibsdb/sonderborg-calendar

Supplies a slide template for playing sonderborg-calendar videos. This bundle uses SonderborgCalendar's js player: https://github.com/sonderborg-calendar/player.js/

## Installation

Add the git repository to "repositories" in `composer.json`.

<pre>
"repositories": {
    "bibsdb/sonderborg-calendar-bundle": {
      "type": "vcs",
      "url": "https://github.com/bibsdb/sonderborg-calendar-bundle"
    },
    ...
}
</pre>

Require the bundle with composer.

<pre>
composer require bibsdb/sonderborg-calendar-bundle
</pre>

Enable the bundle in `AppKernel.php`, by adding BibsdbSonderborgCalendarBundle to $bundles.

<pre>
new Bibsdb\SonderborgCalendarBundle\BibsdbSonderborgCalendarBundle()
</pre>

Run bibsdb:core:templates:load command to load the template in the installation.

<pre>
bin/console bibsdb:core:templates:load
</pre>

Enable the template in the administration.

## Ads and controls

To avoid ads and video controls, the shared video has to come from a user
that has disabled the options at sonderborg-calendar.com. To do it yourself, you need to have
at least a PLUS account (https://sonderborg-calendar.com/plus).
