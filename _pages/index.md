---
layout: default
permalink: /
---

<p><b>Episodes</b></p>

<ul>
{% for post in site.posts %}
  <li>
    <a href="{{ post.url }}">
      {{ post.title }}
    </a>
  </li>
{% endfor %}
</ul>
