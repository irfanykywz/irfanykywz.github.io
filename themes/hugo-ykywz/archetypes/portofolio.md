---
title: {{ replace .File.ContentBaseName "-" " " | title }}
description: 
image: "image.png"
stack: ['python']
category: Desktop
duration: 5 month
status: Active
demo: https://google.com
buy: https:google.com/ncr
# github: https://google.com
date: {{ .Date }}
draft: false
---


<!-- overview -->
{{< portofolio/overview title="Overview" >}}
<!-- overview-content -->
{{< /portofolio/overview  >}}

<!-- feature -->
{{< portofolio/feature >}}

    {{< portofolio/feature-card 
        icon="fas fa-rocket" 
        name="Auto Load" 
        description="Hello"  
    >}}

{{< /portofolio/feature  >}}


<!-- galery -->
{{< portofolio/galery >}}

    {{< portofolio/galery-card 
        image="https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=600" 
        name="Auto Load" 
        description="Hello"  
    >}}

{{< /portofolio/galery  >}}

<!-- stack -->
{{< portofolio/stack stack="PHP, Python, Java" >}}

<!-- testimony -->
{{< portofolio/testimony >}}

    {{< portofolio/testimony-card 
        review="good" 
        author="Joni Luck" 
        from="Aligatora, USA 3/1/4"
        rating=4  
    >}}

{{< /portofolio/testimony  >}}