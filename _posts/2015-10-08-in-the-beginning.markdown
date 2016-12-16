---
layout: post
title:  "In the Beginning..."
date:   2015-10-08 12:42:00
---
Hi there, and thanks for taking the time to check out Intecture. You can find out exactly what Intecture *is* from the website - [intecture.io](https://www.intecture.io), though in a nutshell it's a language agnostic, DSL free, mercury free systems management tool for developers. Actually I stole that from the home page, so I saved you the hassle.

I can't tell you how pleased I am to finally be writing the first public *announce* post. As I'm writing this I'm also writing a shopping list of things I need to do before this gets published. So actually when I say "I can't tell you how pleased I am", that is a factual statement and not hyperbole. Though now that you're reading this, I'm sure I'm still happy.

I thought it would be appropriate that the first post covered some of the basics of the project, like who I am and why on earth we now have Yet Another IAC Tool?! Actually, I would have called the project 'YAIT' instead of Intecture, but I only just thought of it now and I definitely can't be bothered to talk to the trademark lawyers again.

# Who Am I?

To answer the easy question, my name is Pete and I am an IT guy. I started life as a software developer writing PHP apps back when IE6 was still the prevalent browser, and since the therapy I've had roles in everything from front end to data centre design. You could probably call me a jack of all trades, though "Master of None" is likely going to be my epitaph.

Since starting to develop Intecture as a concept, I created a company (Between Lines Ltd) with which to house the product and its legal and economic responsibilities. By the way, Between Lines is a UK registered company, for anyone searching Botswana's company listings.
 
# What is IAC?

To answer the second question, let's cover what IAC actually means. IAC is an acronym for Infrastructure As Code and is quite the buzzword in sys admin circles at the moment. Though now they're calling it "dev ops". Kids these days... Anyway, IAC tools are supposed to be a way of managing servers, like your favourite Apache server, using a standardised abstracted interface that you consume with software, otherwise known to humans as an API.

When I first conceived of this idea, I had never heard of IAC or the plethora of products already filling this space. I was smug. Then a quick Google search revealed that I was at least person number 11 to have this idea. Then I visited page 2 of the results and downgraded myself to number 21. Feeling downbeat about my 21st best idea, I decided to try out a few of the existing tools to see what I missed out on. Three years and many many prototypes later, here we are. So why did I choose to reinvent the wheel?

# Why Do We Need Yet Another IAC Tool?

I started writing Intecture as much in response to the current tooling as it was to see my own ideas come to fruition. Having used two of the leading IAC tools in anger, I found myself burned out pretty fast. I didn't enjoy having to use Ruby. Not that I have anything against Ruby itself, but I already knew several very similar languages (like PHP) and didn't want to be forced into learning another.

Then there's the difficulty of using DSLs. I found myself constantly asking 'What part of this code is native and what part of it is a DSL?' Searching the web for correct syntax was a nightmare and I was constantly switching between the vendor's documentation and Ruby's reference manual. This might seem like a trivial problem for people already experienced with Ruby, but for those of us unfamiliar with the language, it's *really* time consuming!

Another issue that I had with these tools is the lack of transparency in how they're getting from A to B. The reality for most of us is, while a product's source code may be readily available to inspect, it may as well be on the moon given the time it would take to fully understand its inner workings. When it came to execution, both tools would first pre-compile their code before final execution, which makes debugging very difficult and impossible to set breakpoints in your IDE. Thus fixing complicated issues becomes all too hard very quickly, and bad habits are never far behind an exasperated programmer. Especially when they're on a deadline.

From a management perspective I also found these tools difficult to implement. As they rely on DSLs and complex moving parts, hiring Ruby developers wasn't enough. I needed to hire specialists in order to make meaningful progress on our projects. However when you already have Ruby developers on staff, it's hard to justify hiring more when the issue isn't lack of manpower but lack of knowledge. I'm confident that if we were using a standardised API, the knowledge gap wouldn't be nearly as severe.

# Quick Caveat

Ok, so let's quickly ground ourselves before this turns into an episode of YouTube comments. For people who are experienced in existing IAC tools, I'm sure you've already worked out solutions to the problems I've raised, or don't see them as problems at all. However you have to ask yourself whether the level of difficulty and required knowledge would be as high if we took a more standardised approach.

We all implement APIs as a matter of course. REST APIs are all the rage right now, and software libraries have existed since the dawn of time to help us solve recurring issues quickly. So why isn't IAC the same? Why can't we just download a library that plugs into our existing ecosystem? No DSLs, no pre-compilers, no magic features and no sentence uttered containing the phrase "it just works". BYO programming language! **This** is where Intecture sets itself apart.

# Day 14 of *n*

It'd look much better if I'd said "Day 1", though this is actually day 14 in Intecture's public history. Version 0.0.1 has been quietly lingering on GitHub for two weeks today. It is by no means a finished product, or even much of a beta product. To be blunt, Intecture is currently less useful and vastly less secure than running:

~~~ bash
ssh imwatchingyou@intecture.io whoami
~~~

However what we have now is the ground work for all future development. We can run things in remote places, expose these 'things' as functions in an API library and bind this library to other languages. I'm confident that while this first milestone has been hard fought, achieving the next one will be significantly easier!

Cheers,

**Pete**<br />
<s>Vice President</s> Junior Vice President, Between Lines Ltd.
