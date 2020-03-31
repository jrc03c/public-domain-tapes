---
layout: default
permalink: /
---

{% for post in site.posts %}
<div class="post">
  <div class="post-thumbnail">
    <a href="{{ post.url }}">
      <img src="{{ post.artCropped }}">
    </a>
  </div>

  <div class="post-content">
    <p>
      <a href="{{ post.url }}"><b>{{ post.title }}</b></a><br>
      {{ post.date | date:"%Y-%m-%d" }}
    </p>

    {{ post.summary }}
  </div>
</div>
{% endfor %}
