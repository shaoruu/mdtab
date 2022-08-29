import { Renderer } from '../components';

export const Comps = () => {
  return (
    <Renderer
      children={`
# Heading 1 
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

Colonies **comprise socially monogamous**, extended family groups with overlapping generations, known as "clans", which exhibit cooperative breeding. Non-breeding individuals become helpers to relatives and assist to raise their brood. In white-fronted bee-eaters, this helping behavior is particularly well developed with helpers assisting in half of all nesting attempts.[3] These helpers may contribute to all aspects of the reproductive attempt, from digging the roosting or nesting chamber, to allofeeding the female, incubating and feeding the young; and have a large effect on increasing the number of young produced.[4]

Only 50% of non-breeders *in a colony typically* become helpers, and whether or not an [individual](http://www.google.com) becomes a helper and to whom it provides aid is heavily dependent on the degree of kinship involved. Non-breeders are most likely to become helpers when breeding pairs are close genetic relatives. When faced with a choice of potential recipient nests, helpers preferentially help the breeding pair to whom they are most closely related, suggesting that this behaviour may serve to increase the helper's inclusive fitness.

Female white-fronted bee-eaters leaving their nesting burrows must **avoid pursuit by unmated males who may** force them to the ground and rape them. Furthermore, their unwelcome attentions are preferentially against females who are laying eggs and who thus might lay the eggs of their rapist rather than their mate.[5]

1. BirdLife International (2016). "Merops bullockoides". IUCN Red List of Threatened Species. 2016: e.T22683684A92995705. doi:10.2305/IUCN.UK.2016-3.RLTS.T22683684A92995705.en. Retrieved 13 November 2021.
    - A mug is a type of cup typically used for drinking hot drinks, such as coffee, hot chocolate, or tea. Mugs usually have handles[1] and hold a larger amount of fluid than other types of cup. Typically, a mug holds approximately 240–350 ml (8–12 US fl oz; 8.3–12.5 imp fl oz) of liquid.[2] A mug is a less formal style of drink container and is not usually used in formal place settings, where a teacup or coffee cup is preferred. Shaving mugs are used to assist in wet shaving.
2. Gosler, Andrew, ed. (1991), The Hamlyn photographic guide to birds of the world, foreword by Christopher Perrins, London: Hamlyn, ISBN 0-600-57239-0.
3. Emlen, S. T. & Wrege, P. H. (1988), "The role of kinship in helping decisions among white-fronted bee-eaters", Behavioral Ecology and Sociobiology, 23 (5): 305–315, doi:10.1007/BF00300577, S2CID 33323731.
4. Emlen, S. T. (1997), "Family Dynamics of Social Vertebrates", in Krebs, J. R.; Davies, N. B. (eds.), Behavioural Ecology: An evolutionary approach (4th ed.), Cambridge: Blackwell Science, ISBN 0-86542-731-3.
5. Emlen, S. T. & Wrege, P. H. (1986), "Forced copulations and intraspecific parasitism: two costs of social living in the white-fronted bee-eater", Ethology, 71 (1): 2–29, doi:10.1111/j.1439-0310.1986.tb00566.x.

- test
  - test
    - test
      - test
    - test 
    - test

# Status (7/10)
Right now, I'm done with most of the work needed to create the MVP. It is time to finalize some features, and start implementing MVP-specific features.

## Todo's
These are the components that I need to finalize on, potentially on Voxelize:
- [x] ==server+auth== Rust to TypeScript messaging, specify what events the transport wants to listen to, and what to broadcast from the rust server to the transport
- [x] ==server+auth== World-specific entity data setting from transport to rust (to set the texts of the scoreboard)
- [x] ==client== Audio system, a robust "emit" based audio system to register sound tracks and play any tracks throughout the gameplay
- [ ] ==client== Animation system, ThreeJS based glTF animation system to import BlockBench animated client models

And these are the MVP specific components to implement:
- [x] ==server== Trigger events for parkour respawning
- [x] ==client== Floating text for scoreboard, potentially with colored text
- [ ] ==client+server== More organized block types and block styles
- [ ] ==client== Wall jumping for parkour variety + sneak
- [x] ==client+auth== Permission and username syncing with TS server
- [x] ==client== Client model  + customization (hats)
- [ ] ==client== UI components for MVP

And here are some features that would be *nice* to have in the MVP:
- [ ] Custom logical block generation @voxelize
- [ ] Day-night cycles @voxelize
- [ ] Unified particle system for things like firework @voxelize
- [ ] World edit on the client side @voxelize

# Status (7/23)
The status right now is that time is ticking towards August 1st, and I haven't gotten an MVP out yet. So here are some final things that I have to work on, sort of to get the priorities straight, and also some future plans.

## Todo's
- [x] Checkpoint system, saving to local storage or session storage.
- [x] Scoreboard system, backend TS server syncing, user authentication.
- [x] Floating text displays, displaying a the scoreboard and more.
- [x] Character/peer animation.
- [x] UI design and implementation.
- [x] Actual parkour itself.

## Extras
- [ ] Documentation client + server side.
- [ ] At least 5 tutorials on docs.voxelize.io

## Future Plans
- [ ] Post on youtube, first video is going to be a tech demo. People seem to like it when I do tech demo's, so might as well record it and make a youtube video about it.
- [ ] Setup a discord server, get people to start talking about it.
# Status (7/30)

# Events @voxelize
The events system is a robust system that allows developers to listen to events fired from the Voxelize server, and also allow servers to fire custom events with certain payloads.

## Definition
An event consists of **four** parts:
- Event name: A string that represents this event. To differentiate from the DOM event listeners, Voxelize events take the convention of having capitalized event names. Example event names could be \`ANIMATION_START\` or \`TELEPORT\`.
- Payload: A JSON serializable data that provides additional information about the event. 
- Filter: A \`ClientFilter\` that defines what sets of users should be able to receive this event.
- Location: An optional parameters determining if this event should be location specific. If this event is location specific, then only clients that have the chunk that this event happened loaded would receive.

## Example
- In any system in the ECS world or in any method handlers, Voxelize developers can define what event to be fired as such:
\`\`\`rust
{
	let mut events = world.events_mut();

	// Dispatch an event happening at chunk <0,0> that teleports a user
	// with id of <user_id> to [0.0, 80.0, 0.0].
	events.dispatch(
		Event::new("TELEPORT")
			.payload(json!([0.0, 80.0, 0.0]))
			.filter(ClientFilter::Direct("<user_id>"))
			.location(Vec2(0, 0))
			.build()
	);

	/// Every game tick, the event gets fired to the user depending on:
	/// - Client filter of the event
	/// - Loaded chunks of the users
}
\`\`\`
- On the client-side, the user can do something as such
\`\`\`js
// Expect \`payload\` to be a JSON parsed object. If parsing fails, 
// no event is fired, and a warning is thrown.
client.events.on("TELEPORT", (payload) => {
	const [x, y, z] = payload;
	client.controls.setPosition(x, y, z);
});
\`\`\`
      `}
    />
  );
};
