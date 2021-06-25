import React from 'react';

const VideoTutorial=(props)=>{
    return(
        <div class="jumbotron">
  <h1 class="display-6">Работа с программой</h1>
  <iframe width="560" height="315" src="https://www.youtube.com/embed/FzcfZyEhOoI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  <hr class="my-4"/>
  <p>Инструкция по использованию онлайн платформы для кодинга. Ссылка по кнопке</p>
  <a class="btn btn-primary btn-lg" href="https://jupyter.org/" role="button">Ссылка</a>
</div>
    )
}
export default VideoTutorial;