---
layout: default
permalink: /
tags: pages
---

{% assign sortedEpisodes = collections.episodes | reverse %}
{% for episode in sortedEpisodes %}

<div class="post">
  <div class="post-thumbnail">
    <a href="{{ episode.data.permalink }}">
      <img src="{{ episode.data.artCropped }}">
    </a>
  </div>

  <div class="post-content">
    <p>
      <a href="{{ episode.data.permalink }}"><b>{{ episode.data.title }}</b></a><br>
      {{ episode.date | prettify-date }}
    </p>
  </div>
</div>

{% endfor %}
