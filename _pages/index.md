---
layout: default
permalink: /
---

<p><b>Episodes</b></p>

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
      {{ post.date }}
    </p>

    {{ post.summary }}
  </div>
</div>
{% endfor %}
