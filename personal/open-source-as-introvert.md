### Building open-source as an introvert, by an introvert

Alright, I'm just going to say it. I don't do networking. Like, at all. No conferences, no meetups, no "let's grab coffee" with random people, no cold emails. I know these things work for some people, but the idea of walking into a room full of strangers and making small talk for hours? I'd honestly rather stare at a wall. And somehow I've managed to build open-source projects that people actually use and even contribute to.

This isn't some advice or whatever. It's just me sharing how I do things because I spent way too much time thinking I was doing it wrong since everyone else seems to be at conferences and building their "personal brand" on LinkedIn.

### Stuff I don't do

Conferences. I know people swear by them and tell me I'm missing out. But the thought of traveling somewhere, staying in a hotel, being socially "on" for days, it's exhausting just to think about. I've never been to one. I probably never will.

Meetups are the same. After work I just want to go home, recharge, maybe watch some anime or mess with my Arch setup. Not spend two more hours in a room talking to people.

LinkedIn networking. I have a profile because you kind of have to, but I don't DM people, I don't comment on posts trying to get noticed, I don't post hot takes about frameworks. If I post anything it's usually just sharing a project I built.

Coffee chats as a "strategy." If I reach out to someone it's because I actually have something to say or ask. Not because I read an article about how you should have coffee with 50 people a month.

Look, I'm not saying any of this is bad. If it works for you, cool. I just spent a long time feeling like I was failing because I wasn't doing what everyone else was. Eventually I realized maybe I'm just playing a different game.

### What I actually do

So if I'm not doing all that, what do I do? Mostly just build things and try to make them not suck to use.

**Documentation**

This is probably the biggest thing. If someone finds my project and the README doesn't make sense in the first minute, they're probably leaving. I've been on that side too many times, finding a cool project but having no idea how to run it. So I write the docs I wish existed.

Not just installation. Examples. Screenshots. Common issues and how to fix them. Sometimes I overdo it. I'll write a whole tutorial when three sentences would have worked. Whatever, I'd rather over-explain than leave people confused.

**Issues aren't tickets**

When someone opens an issue, I don't think of it as a support ticket to close. It's a conversation.

There was this time. I remember it clearly. A guy named hectormiguel1 opened an issue on 0ptiscaler4linux. Now, 0ptiscaler4linux is this little tool I built to handle display scaling on Linux because the built-in stuff has always annoyed me. His issue wasn't "it doesn't work." It was a really thoughtful message about the architecture and some ideas he had.

I sat there staring at it. Usually issues are just bug reports. This guy actually thought about the code. So I wrote back. Properly. Explained why I did things that way, asked what he thought about X, admitted Y was kind of a hack and I wanted to fix it.

He replied. We went back and forth a few times. Eventually he sent a pull request. First external contributor to that project.

I didn't do anything special. No LinkedIn message, no coffee chat. Just treated his issue like it mattered, because it did. The project has 24 stars now, and he was the start of that.

**Code I won't hate later**

I write code assuming someone else will read it, because they probably will. Variable names that make sense. Functions that do one thing. Comments when something isn't obvious. Consistent style.

It takes longer but it's worth it. When someone forks and sends a PR, you don't want to spend an hour trying to understand changes because your codebase is a mess. And when you come back to your own code six months later, you don't want to be like "what was past-me thinking."

**Commits that make sense**

I try to write commit messages that are actually useful. Not "update" or "fix stuff." But "fix handle case where scaling resets after suspend fixes #47" or "feat add support for different Wayland compositors."

This isn't me being pedantic. It's that when I'm looking at git history three months from now trying to remember when something broke, I don't want to be guessing.

### The projects speak for themselves

TerminalCoin. CLI for crypto with news and social integrations. Built it because I wanted something specific and nothing like it existed. People found it. Some starred it. A few opened issues. One person sent a PR.

Int3rceptor. HTTP/HTTPS proxy interceptor in Rust. Niche, but if you need it, it just works.

These aren't massive projects. 0ptiscaler4linux has 24 stars. TerminalCoin has 18. Int3rceptor has 32. But every single one is real. Someone found the project organically and decided it was useful enough to star.

No marketing. No "hey everyone check this out" on Reddit or Hacker News. No Twitter threads about my journey. Just putting work out there and letting people find it if it's useful.

This is slow. You don't get viral growth this way. But I'm okay with that.

### GitHub as networking, sort of

I do build relationships, just not in person. Through issues and pull requests.

Someone opens a PR. I look at their changes, ask questions, maybe suggest a different approach. We go back and forth. Eventually it gets merged. That person is now part of the project's history. Never met them. Don't know what they look like, what they do, where they live. But we worked together.

Sometimes people open issues not to report bugs but to start discussions. "Have you thought about X?" or "Why Y over Z?" These can go on for days. Sometimes they change how I think about the project. Sometimes they don't.

This is how I've met developers from all over. Never been in the same room, but we've worked together on code. That counts.

### What I might be missing

I'm not going to pretend there are no downsides. I probably miss stuff.

I don't get seen by recruiters who do all their hiring at conferences. I might miss speaking opportunities that come from being visible at events. Could be job offers or collaborations that happen through in-person connections that never reach me because I'm not in those circles.

Sometimes I wonder if my projects would grow faster if I was more "out there." Maybe. Maybe not.

But here's what I get.

I don't have to perform extroversion. I can just be me. The projects I build and code I write are things I actually care about, not things I think will get me noticed.

I don't burn out. I've been maintaining these projects for a while and I'm not tired of them. The process doesn't drain me.

The people who find my projects and contribute are there because they want to, not because I sold them on it. Feels more real.

I have time. Time to code, time to learn because I'm deep in PHP/Laravel right now, time to just exist as someone who happens to be vegan, likes anime, plays games, runs Arch Linux, and occasionally spends three days tweaking a window manager setup that probably doesn't matter but makes me happy.

### You don't have to play the same game

The tech world has this weird obsession with being everything. Great coder AND charismatic speaker AND active on social media AND always networking AND giving talks AND writing blog posts.

It's a lot. Especially if you're introverted.

The good thing about open-source is nobody cares about your networking skills if your code solves their problem. They don't care if you've never given a talk. They don't care if you have 50 LinkedIn connections or 5,000.

What they care about is simple. Does it work? Is it documented? Can I use it?

You can build a reputation just by doing good work. Might grow slower than the person at every conference posting daily on LinkedIn. That's okay. Growth from people actually using and valuing your work feels good.

Look, if networking and conferences work for you, keep doing them. I'm not trying to talk anyone out of things they enjoy.

But if you're like me, if the thought of another coffee chat makes you want to hide under your desk, if conference season feels like something to survive, there's another way.

Write code that solves real problems. Document it properly. Be thoughtful in issues and PRs. Build things you care about.

The rest follows.

This is how I do open-source. Not the right way for everyone. Not sure it's the "right" way at all. But it works for me, my projects are alive, people use them, and I haven't burned out. That counts.
