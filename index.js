const main = () => {

    $('.set').on('click', () => {
        const input = $('.in').val();
        console.log(input);
        get(input);
    });

    const get = async (input) => {
        let response = await fetch(`https://masak-apa-tomorisakura.vercel.app/api/search/?q=${input}`);
        response = await response.json();
        update(response.results);
    }

    const update = (datas) => {
        $('.list').html('');
        datas.forEach(data => {
            $('.list').append(`
            <div class="col-md-4">
                <div class="card mb-3">
                    <img src="${data.thumb}" class="img-thumbnail" alt=" Image"/>
                    <div class="card-body">
                        <h5 class="card-title">${data.title}</h5>
                        <p class="card-text">Estimated time : ${data.times}</p>
                        <p class="card-text">Serving portion : ${data.serving}</p>
                        <button type="button" id="ngentod" class="btn btn-success open-modal" data-id="${data.key}" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            Get recipe
                        </button>
                    </div>
                </div>
            </div>
            `);
        });
    }

    const getRecipe = async (key) => {
        let response = await fetch(`https://masak-apa-tomorisakura.vercel.app/api/recipe/${key}`);
        response = await response.json();
        updateModal(response.results);
    }

    $('.list').on('click', '.open-modal', function() {
        const key = $(this).data('id');
        getRecipe(key);
    });

    const updateModal = (data) => {
        $('.modal-title').html(data.title);
        let template = `
        <img src="${data.thumb}" class="img-thumbnail rounded-md mb-5" alt=" Image"/>
        <div class="bg-success bg-gradient p-2 text-white rounded">
        <p class="text-justify">${data.desc}</p>
        </div>
        <br>
        <h2>Yang dibutuhkan : </h2>
        `;
        $.each(data.needItem, (i, e) => {
            template += `<p>=> ${e.item_name}</p>`
        });
        template += `
        <br>
        <h2>Ingredient</h2>
        `;
        $.each(data.ingredient, (i, e) => {
            template += `<p>=> ${e}</p>`
        });
        template += `
        <br>
        <h2>Step : </h2>
        `;
        $.each(data.step, (i, e) => {
            template += `<p>${e}</p>`
        });
        $('.modal-body').html(template);
    }

}

document.addEventListener("DOMContentLoaded", main);