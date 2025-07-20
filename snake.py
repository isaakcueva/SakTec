import pygame
import random

# Inicializar Pygame
pygame.init()

# Configuración de la pantalla
width, height = 640, 480
screen = pygame.display.set_mode((width, height))
pygame.display.set_caption('Snake Game')

# Colores
black = (0, 0, 0)
white = (255, 255, 255)

# Tamaño del bloque y velocidad
block_size = 20
snake_speed = 15

# Inicializar la serpiente
snake = [(width // 2, height // 2)]
direction = 'RIGHT'

# Inicializar la comida
food = (random.randrange(1, (width // block_size)) * block_size, random.randrange(1, (height // block_size)) * block_size)

# Función para dibujar la serpiente
def draw_snake(snake):
    for segment in snake:
        pygame.draw.rect(screen, white, [segment[0], segment[1], block_size, block_size])

# Función principal del juego
def game_loop():
    global direction, food  # Agrega "food" a la lista de variables globales
    game_over = False

    while not game_over:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                game_over = True
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_LEFT and direction != 'RIGHT':
                    direction = 'LEFT'
                if event.key == pygame.K_RIGHT and direction != 'LEFT':
                    direction = 'RIGHT'
                if event.key == pygame.K_UP and direction != 'DOWN':
                    direction = 'UP'
                if event.key == pygame.K_DOWN and direction != 'UP':
                    direction = 'DOWN'

        # Mover la serpiente
        head_x, head_y = snake[0]
        if direction == 'LEFT':
            head_x -= block_size
        if direction == 'RIGHT':
            head_x += block_size
        if direction == 'UP':
            head_y -= block_size
        if direction == 'DOWN':
            head_y += block_size

        new_head = (head_x, head_y)
        snake.insert(0, new_head)

        # Comprobar colisiones
        if snake[0] == food:
            food = (random.randrange(1, (width // block_size)) * block_size, random.randrange(1, (height // block_size)) * block_size)
        else:
            snake.pop()

        # Dibujar la pantalla
        screen.fill(black)
        pygame.draw.rect(screen, white, [food[0], food[1], block_size, block_size])
        draw_snake(snake)
        pygame.display.update()

        # Controlar la velocidad
        pygame.time.Clock().tick(snake_speed)

    pygame.quit()
    quit()

# Ejecutar el juego
if __name__ == '__main__':
    game_loop()
