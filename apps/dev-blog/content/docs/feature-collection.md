```yaml @@
title: Feature Collection
description:
  a collection of planned features for mosquito.social fron the perspective of a
  user.
```

_Version from: 2026-04-03_

Here are the features that should be supported by mosquito social. This list
explicitly leaves out any implementation details or architecture (except if
needed for clarity).

## Authentication

- User Authentication: A user has to be able to identify themselves. This
  usually goes in two steps
  - Registration: Create a new account
  - Login: For recurring users
  - Annotation: Architecturally, this is the most crucial part. If we want to be
    a part of the Fediverse or the ATmosphere, we have to do something for it.
    That means either we use the infrastucture of the others (people need an
    account on e.g. Bluesky to join) or we provide infrastructure but then this
    infrastructure is automatically part of the federated world (and thus
    receives traffic).

## Communities

- Create a Community: Any user can create a community.
  - The only core decisions are
    - where it should live (you should be able to select a server)
    - what unique identifier (slug/handle) you want. This is relatively
      permanent. The target URL is formed with it.
  - Annotation: Also "This Server" might always be an option. Then the community
    is hosted on `mosquito.social/communities/graffiti-sprayers-berlin` (of
    course mosquito.social does not have to be the only instance of the network)
  - As a community creator, you are automatically assigned to the role `host`
- Change Community settings
  - Joining Members mode: Auto Join, Auto Join but Notify, Review before join
    (knock on the door)
  - Privacy mode: Should the community be findable on `mosquito.social` or do
    you manually want to control who can see your content and join
  - Design: Choose between available designs to fit your audience
  - Location (optional): a host can set a location pin to identify the region
    and home base. Defaults to no location
- Community landing page
  - Contains a header with logo, image, name and claim plus a location
    - As a host, you have the rights to change them
  - Contains the latest feed (more on this later)
  - Contains the list of members
    - as an admin, you can interact with this list
    - you can promote members to `host`s
    - you can expel members
    - if your community is in "Review before Join" mode, there's a list of
      people you can let in. Then their state is changed from `prospect` to
      `member`.
  - Contains a list of upcoming and past events
  - Contains access points to
    - Documentation space (`Pages`)
    - Communication space (`Exchange`)
  - Contains a "Join" button if you're not a `host`, `member` or `prospect` yet
- Join a Community
  - After the join button you are either directly a community `member` or a
    `prospect`
  - A prospect has no rights to view or participate in internal communication.
    Only the "Join" button is gone and replaced by an info box.
    - There's a nudge button for the impatient. It creates a reminder
      notification to the hosts
  - A `member` has access to all areas, but not the extensive editing rights of
    a host. E.g. in the list of members, they can just look at them and get in
    contact, but not change their status
  - A `host` generally has ALL the rights of a `member` plus additional
    features. Therefore further down when I write about members, hosts would
    have at least the same possibilities.

## Posts & Feed

- Write a post
  - Next to the feed there is a "Create" button. With it you can draft and
    submit posts.
  - Posts have all the features that you know of bluesky, mastodon or x etc.
  - Depending on the format and compatibility choices, they might be restricted
    to a certain amount of characters
  - Posts can contain media and enrichments
    - Open Graph: Pasting a url leads to reading its open graph information and
      displaying image and title from it.
    - Images: Attaching one or more images leads to processing them and
      displaying them properly above the text
    - Video: Youtube and other video sources are embedded and should be playable
      inside the UI
    - Surveys: You can ask questions and the system collects answers from the
      other members. "How should we paint the club house? Red, Blue, Millenial
      Grey"
      - A special type of survey (in UI) is the search for dates, that can be
        used to find agreements on when the next event is taking place. (Doodle)
  - After posting, it appears in the internal feed
- Interacting with posts of others.
  - Members can
    - Like it
    - Comment on it (draft an answer, which gives them the same options as with
      creating a new post)
    - Report it (this triggers a note and notification only to the hosts)
  - Hosts can
    - propose to make it public
      - if they do, the writer also has to agree
      - then it becomes a public post on the landing page (i.e. also visible to
        `non-members` and `prospects`)
      - {needs confirmation} and it's a formal bluesky post authored by the
        community that lands in the firehose and therefore is consumed by all
        available feeds

## Events

- Create an event
  - `host`s can create community events. When they do they move into the role of
    an `organizer` for the event
  - events must have a start and end date
  - events can have a location, but there could be other information on how and
    where to join (e.g. a zoom call). Hosts can define if this is visible only
    to participants or to everyone in the community
  - events can have a maximum number of participants
  - events just as communities can have a door or review policy. when active, an
    organizer has to approve joiners before they become participants
  - community `host`s don't have more rights unless they become organizers. Only
    the initiator is automatically an organizer.
    - Organizers can appoint others to be co-organizers,
      - they can let people in, or throw them out (revoke their reservation)
      - thy can also change the metadata / settings / description of the event.
  - Events can have additional information such as
    - teaser
    - description
    - agenda
  - a created event is automatically shared in the feed of the community
  - a created event appears in the list of events
  - events can be publicly or internally visible. The only difference is that
    public ones can appear in searches also for non members.
    - If a non-member RSVPs for an event they automatically also apply for
      community membership (see Join a Community)
- Join an event
  - `members` can RSVP to an event - the possible states are `maybe`, `no`,
    `yes`
  - Additionally, there is an actual state, which is decided by the type of
    event.
    - `reservation`: you have a seat in the event
    - `waitinglist`: the max number of participants is already reached, but if
      someone declines, there is a list of candidates and there's a chance you
      can join
    - `declined`: An organizer could revoke the reservation for someone who
      already has rsvp'ed. This has to go together with a notification message
- close an event
  - an event becomes inactive in the moment of the start date
  - it's visually marked as done in the moment of the end date
  - One week after that, an event receives the state finished.
  - organizers can also finish the event manually and add some final notes
  - Finishing triggers a handful of things
    - a thanks for participating post is created for the event
    - notification messages are sent to all participants
    - a documentation page is being created (which can be edited and enriched
      afterwards, e.g. with impressions, footage, slide decks)

## Notifications

- Notifications are messages triggered by an actor or incident targeting one or
  more other actors.
- Notifications appear in the web app (synced via heartbeat or websocket)
- They can also trigger an E-Mail (if the user has turned on that setting)
- The following triggers create notifications
  - Someone clicks on a community join button -> hosts
  - Join is approved -> joiner (member)
  - Someone rsvps for an event -> organizers
  - rsvp is approved -> joiner (participant)
  - An event organizer clicks on announcement and crafts a promo message ("only
    a few seats left") -> members or rsvp-maybes
  - An event organizer clicks on update and crafts an info note ("buffet is
    opened") -> event participants

## Messaging

- people inside a community have the possibility of direct instant messaging
  exchange
- a community automatically hosts several chat groups
  - the community as a whole (hosts & members)
  - hosts only (if there is more than one)
  - every event (organizers & participants)
  - organizers only (if there is more than one)
- additionally there are buttons next to members for direct contact
- also there is the possibility to create sub-groups manually (e.g. an
  organization council or a task force)

## Pages

- A community can create an arbitrary amount of pages
- All members of the community can create, edit, delete pages
- The full history is available however. So previous states can easily be
  restored
- A documentation page consists of
  - a slug (permalink)
  - a title
  - a description
  - an optional cover image
  - rich text content
    - this can itself contain the following elements (beyond the standards)
    - images (drag & drop, copy & paste) - visible in the page
    - video footage - visible in the page
    - files - placeholder in the page (for download)
    - special components to display schedules and timelines (for events)
    - mentions will be replaced by mini profiles
  - Internal links (connecting one page to the next, wiki-style)
- Each community event automatically has an entry page
- Pages are internal by default - only accessible by members
- Hosts can make pages public. Then they are visible by everyone (even
  unauthenticated visitors)
- The community itself has a public entry page for initial descriptions and
  further links

## Discoverability

- once there are enough communities, we will have a layer above, where
  non-members can discover what is offered
- Discovery follows several ways all of which are also available for
  non-authenticated visitors
  - text search for keywords. People can search for e.g. "photography"
    - the result would be a list of communities and/or upcoming events that have
      this in their name or description
    - the sorting algorithm could / should also consider the location and the
      date (events further in the future will be ranked lower)
  - location based search.
    - There is a map in combination with an input field
    - the map shows pins of all communities and events that are in the map
      viewport and match the search term
  - search for users
    - (can be part of the text search)
    - the results show user profiles
- discovery paths only find items that want to be found. On all levels (user,
  community, event), the visibility/discoverability can be restricted, which is
  of course taken into account by the search algorithms
- All Items have landing pages (as described before) that allow further
  discovery
  - e.g. if you find an event "photography tour through Hamburg harbor", you can
    see all participants with a public profile and click on them. You can also
    see the community that hosts this event and also click on that. Etc.
