import React from 'react';

const VideoTutorial=(props)=>{
    return(
        <div class="jumbotron">
  <h1 class="display-6">{props.title}</h1>
  <iframe width={window.innerWidth/2.5} height={window.innerHeight/2.5} src={props.url} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  <hr class="my-4"/>
  <p>{props.description}</p>
  <a class="btn btn-primary btn-lg" href={props.website_url} role="button">Ссылка</a>
</div>
    )
}
export default VideoTutorial;