# Palola 🐶

![](https://img.shields.io/badge/license-CC%20BY--NC--ND%204.0-blue)
![](https://img.shields.io/github/last-commit/totoi690/palola-web)
![](https://img.shields.io/github/repo-size/totoi690/palola-web)

> Plataforma para uso do dispositivo dispensador automático de ração: Palola.

<div align="center">
  <img src="public/palola-banner.png" height="320em" align="center"/>
  <img src="https://user-images.githubusercontent.com/68477006/209859787-fdf79484-cfda-44c6-8073-bef8e182ab79.png" height="320em" align="center"/>
  <img src="https://user-images.githubusercontent.com/68477006/209860005-758afeb4-8a47-487c-8b5b-462d416a5a94.png" height="320em" align="center"/>
</div>

## Funcionalidades 🧰
- ⏰ Definição de horários para despejo de ração;
- 🍖 Porcentagem da ração que está atualmente no pote;
- 🐩 Botão para encher o pote de ração na hora que quiser;
- 🔮 Dados das próximas refeições;
- 📅 Grupos de refeições pré-definidas (café da manhã, almoço e jantar);
- 📑 Registro das últimas refeições e seus status.

## Endpoints para Arduino 🌐
Todos os endpoints tem o endereço seguindo o seguinte modelo "https://palola.vercel.app/api/<ENDERECO\>". Todos os endpoint precisam que seja incluso na solicitação HTTP um header do tipo *authorization*, com a chave de identificação do Arduino. No momento, ainda não é possível adicionar seu próprio Arduino.

Nesse momento a plataforma ainda é de **uso fechado** e não é possível se cadastrar.

### Criar nova refeição
```[POST] /startmeal``` 
- Cria uma nova refeição do tipo que for passado nos atributos. Retorna o ID da refeição criada e coloca seu status como *PENDENTE*. Ao mesmo tempo, coloca o status da máquina como *BUSY* (ocupado).
  
> **Atributos**
> - *mealName**: string, nome do grupo de refeições
>   - BREAKFAST = "breakfast",
>   - LUNCH = "lunch",
>   - DINNER = "dinner",
>   - MANUAL = "manual"

> **Resposta**
> - *id*: string, identificador da nova refeição criada

### Finalizar refeição
```[POST] /finishmeal``` 
- Finaliza a refeição cujo ID foi passado como atributo. Coloca o status da refeição como o status passado como atributo. Ao mesmo tempo, coloca o status da máquina como *FREE* (livre).
  
> **Atributos**
> - *status**: int, novo status da refeição
>   - PENDING = 0,
>   - ACCEPTED = 1,
>   - REJECTED = 2,
>   - ALREADY_FULL = 3
> - *id**: string, identificador da nova refeição a ser modificada

> **Resposta**
> - *message*: string

### Listar grupos de refeições
```[GET] /mealsgroups``` 
- Mostra todos os grupos de Refeições, bem como seus horários.
  
> **Atributos**
> Não há atributos

> **Resposta**
> - *mealsCount*: int, número de grupos de refeições
> - *meals*: array, todos os grupos de refeições
> ```typescript
>   interface MealGroupObject {
>       id: string,
>       name: MealGroup,
>       date: {
>           hours: number,
>           minutes: number
>       }
>   }
> ```

### Mudar o status da máquina
```[POST] /setpalolastatus``` 
- Muda o status da máquina.
  
> **Atributos**
> - *status**: int, novo status da máquina
>   - FREE = 0,
>   - BUSY = 1,

> **Resposta**
> - *message*: string

### Recuperar o status da máquina
```[GET] /getpalolastatus``` 
- Recupera o status da máquina.
  
> **Atributos**
> Não há atributos

> **Resposta**
> - *status**: int, status da máquina
>   - FREE = 0,
>   - BUSY = 1,

### Mudar o peso atual
```[POST] /setweight``` 
- Muda o peso atual do pote de ração.
  
> **Atributos**
> - *current**: float, peso atual a ser mudado

> **Resposta**
> - *message*: string
