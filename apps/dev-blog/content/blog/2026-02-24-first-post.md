```yaml @@
title: Yet another Social Network?
subtitle: What we are building at mosquito.social
description:
date: 2026-03-05
author: Matthias Reis
```

## Filling Some Holes

It seems like a lot of organisers and attendees of meetups feel the same. They
contribute or foster a community for free. But then they have to pay for their
tools.

So the idea to build something ourselves was not so far fetched and we started
to investigate and found out that there are quite some gaps in the supportive
tooling for communities but also in the collaboration tools (aka social media
platforms) themselves.

- As said: For community managers it's relatively pricy to host events on a
  platform like meetup.com. And it even got pricier recently. So either they pay
  out of their own pockets or find long term sponsors.
- The only deal you get in return is a little bit of findability and publicity.
- Almost any type of community has additional tasks for which they need other
  tooling.
  - for organisational coordination, they use instant messengers like Discord or
    WhatsApp. But of course they need to find the right person there first.
    Write to a potential speaker? Good luck.
  - and what if there's something to share after an event? Photo footage, slide
    decks, videos, etc.

So we started looking into the plot holes in the story and found more use cases
and an even better mental approach to our potential product.

## The Niche of Coziness

Social networks are a hostile place these days. You post something with a typo
in it, and you immediately get attacked. If the thought you have is unfinished
or too long, you get mocked or worst case ignored. And for every new idea you
have to find your audience again and again.

Messaging services on the other end of the spectrum are personal. You can
exchange freely and share whatever you like. But it's hard to find the right
audience. If you don't know the other side or are not actively invited, you are
not part of the conversation.

Now imagine the space between those two. A community you can pick or build up
yourself. A closed space with free exchange and the "Vegas Rule" (or any rule
you yourself want to apply). Free to join, but you have to knock on the door.

And additionally with the possibility to meet in person, manage events and so
on.

This thought process automatically spawned additional ideas in my head about how
such a platform could be used.

- Familys can use it to share photos and videos of their last birthday party and
  exchange even if the relatives live far away.
- Working teams can use it to separate professional and personal exchange (and
  stay in contact with former peers).
- Developers can use it for their open source project (yeah, of course we will
  be eating our own dog food).
- Artists, bands, etc. can stay in contact with their fan base. Imagine concerts
  being announced on the platform and you see who else is joining the event in
  your location.

## Idea in a Nutshell

We want to build a platform for communities. It should be possible to start a
community in minutes. You also should be able to spread the word with direct
connection to other, more public social networks. But then you should also be
able to dive into the private space of your community.

We want to have the ability to create events within a community. To start that
journey, how about a "Doodle" like survey feature for finding a good time slot?
People can then RSVP and join the events. For convenience it should be added to
their calendars. But sometimes an organizer can't offer it for free, so at some
point payment will be a topic as well.

There should also be the possibility to collaborate on "documentation" (in lack
of a better word). We're thinking of meeting minutes, shared documents / idea
papers. Especially we think of sharing media like photos or slide decks.

The good thing is that a community is self-sufficient. You don't need a critical
mass of millions of users to make the whole concept work. Only one single
community will be enough to get the project started.

But as soon as it grows, there has to be discoverability as well. The entry page
should offer everything you need from search field to a map where you can find
events nearby.

## Building Blocks, Features and Technical Principles

This article is meant to be the starting point for making this happen so I will
go into more detail now.

### Federated Social Networks

At the core of the development, we place the principle of **federated social
networks**, i.e. decentralaized network nodes with the ability to communicate
with each other server-to-server. This has two major advantages:

1. Such systems can grow horizontally. We don't have to invest in one monolithic
   infrastructure
2. Communities can decide for even more privacy and host their own instances of
   the software.

The most likely scenario is that we will stay compatible with AT Protocol for
many of the architectural approaces, especially with the technical contracts for
client-server and server-to-server communication.

### Open Source

The second base principle is to embrace **open source**. People should not be
afraid of future costs. That's why we safeguard the software under the "Apache
2.0" license. This means that everyone can use the software for free and even
modify it to their needs.

---

On the software side, we will distinguish between two server types:

### Search and Discover

**DI**s or discovery instances will be the open portal into discovering suitable
communities or events. It is expected that there will exist only a few of those,
in the beginning surely only one operated by us, the founders of the project.
DIs will contain features like

- Account management: As a user, you should be able to join several communities,
  which could live on different servers, so your account should be managed
  centrally and have the ability to single-sign-on to all connected MIs.
- Community and Event discovery: You should be able to search for communities
  and events. There will be a location based search with a map view.
- Info Feeds: The DI will act like a social feed of communitiy news as well and
  you can see and subscribe to public posts from communities.

### Plan and Interact

**MI**s or management instances will be the private space of a community. It is
expected that there will exist many of those instances. Therefore community data
should technically be designed to be portable. So you can take it, move it to
another instance and continue with all links still being intact. Each instance
can host one or more communities - I don't see a technical limit except the
available storage or traffic limits.

Communities can be seen as buildings with an entrance and a bulletin board at
the door.

To the outside they act as a regular account in other social networks (Bluesky /
Mastodon). People with the proper rights (community managers) can post content
on behalf of the community.

We will additionally support hashtags for communities and events. The feeds can
then include public statements that use these hash tags (in supported networks).
So if someone posts about their event on bluesky, it would automatically appear
in the feed of the community on the MI.

To the inside - after going through the door of that building - the community
space offers all of the exchange tooling you need:

- A Wiki-like documentation space
- A connected Media library to upload and present footage
- A survey tool for different purposes (among others for finding timeslots for
  events (like Doodle))
- An event management area that lists events, alows to RSVP, creates calendar
  entries and wallet items
- An optional payment plugin for paid events and other fees
- A real time chat environment based on the federated "Matrix" protocol, that
  allows creating sub-groups and direct exchange with all community members.
- A purely internal feed that can provide more private posts than the one that
  goes out to the public. The idea is that members post internally and a
  communit manager can decide together with the author whether a post becomes
  publically available, too.

### Architectural Concepts

The single source of truth for community data will be a so called Repository.
This concept is very similar to Git or also Redux and is implemented in a
similar fashion in the AT Protocol (Bluesky architecture). It represents the
whole history of activity for a community. A single transaction in a community
is a so called Action, which is done by an actor.

A whole set of actions in the correct order forms the entire history. Therefore
the current state (as well as all previous states) can be reproduced from it.
And again therefore it's sufficient to move that stack of data if you want to
migrate a community to another instance or archive it.

Just like in Redux, an action has a name and a payload. On the code side each
type of action has a handler that knows how to update the state (called reducer
in Redux, for example).

So let's say a community member was speaker at the last event and now shares
their slide deck. They create a post and upload the deck. Both will be separate
actions. Then another user likes the post, which increments the likes (e.g. from
0 to 1) and therefore updates the state accordingly.

For the system architecture as a whole, we should build nodes that can be
deployed and hosted in an easy way even by non-experts. The setup should be
compatible with many hosters out there and not rely on special infrastructure
like AWS or Vercel. Also updating the MI should be as easy as running a single
script in the ideal case.

## Minimum Viable Product

The system must be designed in a way that we can achieve all that with lowest
possible effort. But that also means, that we might have to build some core
things more thoroughly and with extensive use cases in mind that would even
exceed an MVP.

But we're not under time pressure and learning about a proper setup is probably
as important as the solution itself. So some parts of a Version 1.0 might be
more than a typical MVP.

On the other hand, the product will surely already be usable without building
every potential feature in detail. So besides the architectural core, what
should be in there?

- Accounts: We need accounts and Authentication. This is the basis for
  everything else.
- Community Creation: People must have the ability to select a preferred MI
  server (there might be only one in the beginning) and create a community with
  a few easy steps.
- Discoverability: Not needed in the beginning. Communities can organise
  Discoverability themselves until we reach a critical mass.
- Comunity Landing Page: A community needs a space to describe what it does and
  what it stands for. This obviously includes a button to join the community.
- Community Feed: Also this is a central aspect that we should support early.
- Event Management: Setting up events, having event descriptions, RSVP'ing and
  showing who takes part needs to be possible from the beginning.
- Simple Observability: Traffic per community, members, server load

In a second Phase we will add

- Payment Plugin (depending on the demand, maybe earlier)
- Collaboration space, sharing footage and slide decks etc.
- Survey tool
- Matrix based Chat System
- Advanced Observability: Storage space per community

Later we will create

- content federation between MI/DI
- Discoverability, Search, Map View

## What's Next?

1. We involve Design to create our visual language. Also we want a cool logo,
   that is recognisable and helps with publicity and buzz.
2. We create the technological core: Hosting, Deployment, CI, etc.
3. We create a staging platform with synthetic test data to validate all
   development steps.
4. We create the first MVP features on top of that.
5. We find a community that acts as a first real world tester.
6. We look for funding and support to continue development.
