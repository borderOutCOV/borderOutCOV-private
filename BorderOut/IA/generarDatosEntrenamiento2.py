# -*- coding: utf-8 -*-
"""
Created on Sun Apr 26 17:15:16 2020

@author: acer
"""

# -*- coding: utf-8 -*-
"""
Created on Sat Feb 29 12:04:25 2020

@author: acer
"""

vocales = ("a","e","i","o","u")
subjects = {"i":"yo","you":"tu","he":"el","she":"ella",
            "we":"nosotros","they":"ellos","it":"eso"}
terceraPersonaGustar = ("a ustedes","a ellos","a nosotros")


def personaGoingMethod(persona):
    if(persona=="yo"):
        return persona+" voy a"
    elif(persona=="tu"):
        return persona+" vas a"
    elif(persona=="el" or persona=="eso"):
        return persona+" va a"
    elif(persona=="ella"):
        return persona+" va a"
    elif(persona=="nosotros"):
        return persona+" vamos a"
    else:
        return persona+" van a"


def generateGoingSentences(common100Verbs):
    fileIngles = open("ingles.txt","a+")
    fileEspanol = open("espanol.txt","a+")
    print("test")
    words = common100Verbs.items()
    for inglesWord, spanishWord in words:
        fileIngles.write(inglesWord+".\n")
        fileEspanol.write(spanishWord+".\n")
        subjectsItems = subjects.items()
        for inglesSubject, spanishSubject in subjectsItems:
            sentence = subjectBeMethod(inglesSubject)
            sentence = sentence+" going to "+inglesWord
            fileIngles.write(sentence+".\n")
            oracion = personaGoingMethod(spanishSubject)
            oracion=oracion+" "+spanishWord
            fileEspanol.write(oracion+".\n")
    fileIngles.close()
    fileEspanol.close()
    

def personayMethod(persona,palabra):
    if(persona=="yo"):
        return " y "+palabra
    elif(persona=="tu"):
        return " y "+palabra
    elif(persona=="el" or persona=="eso"):
        return " y "+palabra
    elif(persona=="ella"):
        palabra = palabra[:-1]
        return " y "+palabra+"a"
    elif(persona=="nosotros"):
        return " y "+palabra+"s"
    else:
        return " y "+palabra+"s"
    

def personaBeMethod(persona,palabra):
    if(persona=="yo"):
        return persona+" soy "+palabra
    elif(persona=="tu"):
        return persona+" eres "+palabra
    elif(persona=="el" or persona=="eso"):
        return persona+" es "+palabra
    elif(persona=="ella"):
        palabra = palabra[:-1]
        return persona+" es "+palabra+"a"
    elif(persona=="nosotros"):
        return persona+" somos "+palabra+"s"
    else:
        return persona+" son "+palabra+"s"
    

def personaNotBeMethod(persona,palabra):
    if(persona=="yo"):
        return persona+" no soy "+palabra
    elif(persona=="tu"):
        return persona+" no eres "+palabra
    elif(persona=="el" or persona=="eso"):
        return persona+" no es "+palabra
    elif(persona=="ella"):
        palabra = palabra[:-1]
        return persona+" no es "+palabra+"a"
    elif(persona=="nosotros"):
        return persona+" no somos "+palabra+"s"
    else:
        return persona+" no son "+palabra+"s"
    
def personaMethod(persona,palabra):
    if(persona=="yo"):
        return persona+" estoy "+palabra
    elif(persona=="tu"):
        return persona+" estas "+palabra
    elif(persona=="el" or persona=="eso"):
        return persona+" esta "+palabra
    elif(persona=="ella"):
        palabra = palabra[:-1]
        return persona+" esta "+palabra+"a"
    elif(persona=="nosotros"):
        return persona+" estamos "+palabra+"s"
    else:
        return persona+" estan "+palabra+"s"
        
    

def subjectBeMethod(subject):
    if(subject=="i"):
        return subject+" am"
    elif(subject=="you" or subject=="they" or subject=="we"):
        return subject+" are"
    else:
        return subject+" is"
    
def andFunction(word):
    return " and "+word

def haveSentence(subject):
    if(subject=="it" or subject=="she" or subject=="he"):
        return subject+" has"
    else:
        return subject+" have"

    

def generateLikeFruitSentences(arrayFruits,common100Verbs):
    fileIngles = open("ingles.txt","a+")
    fileEspanol = open("espanol.txt","a+")
    ###
    words = arrayFruits.items()
    for inglesWord, espanolWord in words:
        print(inglesWord, '-->', espanolWord)
        
        ##Escribir con los sujetos
        mySubjects = subjects.items() 
        for inglesSubject, espanolSubject in mySubjects:
            
            actions = common100Verbs.items()
            for verb,verbo in actions:
                andFruit = andFunction(inglesWord)
                if(inglesSubject=="she" or inglesSubject=="he" or inglesSubject=="it"):
                    fileIngles.write(inglesSubject+" "+verb+"s "+inglesWord+
                                     " , "+verb+"s "+inglesWord+
                                     andFruit+".\n")
                else:
                    fileIngles.write(inglesSubject+" "+verb+" "+inglesWord+
                                     " , "+verb+" "+inglesWord+
                                     andFruit+".\n")
            
                fileEspanol.write(espanolSubject+" "+verbo+" "+espanolWord+
                                  " , "+verbo+" "+espanolWord+
                                  " y "+espanolWord+".\n")
                """words2 = arrayFruits.items()
                for fruit2,fruta2 in words2:
                    andFruit = andFunction(fruit2)
                    if(inglesSubject=="she" or inglesSubject=="he"):
                        fileIngles.write(inglesSubject+" "+verb+"s "+inglesWord+andFruit+".\n")
                    else:
                        fileIngles.write(inglesSubject+" "+verb+" "+inglesWord+andFruit+".\n")
                    fileEspanol.write(espanolSubject+" "+verbo+" "+espanolWord+" y "+fruta2+".\n")
    """
    ###
    fileIngles.close()
    fileEspanol.close()
    
def countSentences(numbers):
    fileIngles = open("ingles.txt","a+")
    fileEspanol = open("espanol.txt","a+")
    numbersToWork = numbers.items()
    for number,numero in numbersToWork:
        fileIngles.write(number+".\n")
        fileEspanol.write(numero+".\n")
    fileIngles.close()
    fileEspanol.close()


def hiSentences(subjects):
    fileIngles = open("ingles.txt","a+")
    fileEspanol = open("espanol.txt","a+")
    mySubjects = subjects.items()
    for ingles,spanol in mySubjects:
        fileIngles.write("hello "+ingles+".\n")
        fileEspanol.write("hola "+spanol+".\n")
    fileIngles.close()
    fileEspanol.close()


    
    
            
 
listOfWords = {"grape":"uva","lime": "lima", "lemon": "limón",
          "cherry": "cereza", "blueberry": "arándano",
          "banana": "plátano","apple": "manzana", 
          "watermelon": "sandía", "peach": "durazno",
          "pineapple": "piña", "strawberry": "fresa",
          "orange": "naranja", "coconut": "coco",
          "pear": "pera", "apricot": "albaricoque",
          "avocado": "aguacate", "blackberry": "zarzamora",
          "grapefruit": "pomelo", "kiwi": "kiwi",
          "mango": "mango", "plum": "ciruela",
          "raspberry": "frambuesa", "pomegranate": "granada",
          "fig": "higo", "tangerine": "mandarina", "fruit":"fruta",
          "carrot": "zanahoria","broccoli": "brócoli",
              "asparagus": "espárragos","cauliflower": "coliflor",
              "corn": "maíz", "cucumber": "pepino", "eggplant":   "berenjena",
              "lettuce": "lechuga", "mushrooms": "champiñones",
              "onion": "cebolla", "potato": "patata",
              "pumpkin": "calabaza", "tomato": "tomate", "beetroot": "remolacha",
              "peas": "guisantes", "zucchini": "calabacín", "radish": "rábano",
              "artichoke": "alcachofa", "leek": "puerro", "cabbage": "col",
              "celery": "apio", "chili": "chile", "garlic": "ajo",
              "basil": "albahaca", "coriander": "cilantro",
              "parsley": "perejil", "dill": "eneldo", "rosemary": "romero",
              "oregano": "orégano", "cinnamon": "canela",
              "saffron": "azafrán", "bean": "frijol",
              "chickpea": "garbanzo", "lentil": "lenteja",
              "cats":"gatos",
           "apples":"manzanas",
            "onions":"cebollas",
            "brids":"pájaros",
            "trucks":"camiones",
            "cars":"autos",
            "houses":"casas",
            "windows":"ventanas",
            "boys":"niños",
            "desks":"escritorios",
            "rooms":"habitaciones",
            "cupboards":"alacenas",
            "toys":"juguetes",
            "chairs":"sillas",
            "shoes":"zapatos",
            "benches":"bancos",
            "kisses":"besos",
            "foxes":"zorros",
            "buses":"autobuses",
            "witches":"brujas",
            "boxes":"cajas",
            "wishes":"deseos",
            "bushes":"arbustos",
            "classes":"clases",
            "ashes":"cenizas",
            "lunches":"almuerzos",
            "churches":"iglesias",
            "scratches":"rasguños",
            "brushes":"cepillos",
            "matches":"fósforo/partido",
            "babies":"bebés",
            "families":"familias",
            "libraries":"bibliotecas",
            "parties":"fiestas",
            "agencies":"agencias",
            "urgencies":"urgencias",
            "cities":"ciudades",
            "countries":"países",
            "flies":"moscas",	
            "dominoes":"dominós",
            "potatoes":"papas",
            "tomatoes":"tomates",
            "heroes":"héroes",
            "zeroes":"ceros",	
            "halves":"mitades",
            "knives":"cuchillos",
            "lives":"vidas",
            "thieves":"ladrones",
            "wives":"esposas",
            "children":"niños",
            "feet":"pies",
            "geese":"ganzos",
            "fish":"peces",
            "men":"hombres",
            "women":"mujeres",
            "teeth":"dientes",
            "deer":"ciervos",
            "mice":"ratones",
            "people":"personas",
            "animal":"animal",
           "pet":"mascota",
           "dog":"perro",
           "cat":"gato",
           "bull" : "toro",
            "cow" : "vaca",
            "chicken" : "pollo",
            "hen" : "gallina",
            "rooster" : "gallo",
            "chick" : "pollito",
            "donkey" : "burro",
            "goat" : "cabra",
            "horse" : "caballo",
            "pig" : "cerdo",
            "rabbit" : "conejo",
            "sheep" : "oveja",
            "turkey" : "pavo",
            "goose" : "ganso",
            "llama" : "llama",
            "ox" : "buey",
            "prawn" : "langostino",
            "shrimp" : "gamba",
            "crab" : "cangrejo",
            "dolphin" : "delfín",
            "shark" : "tiburón",
            "eel" : "anguila",
            "whale" : "ballena",
            "killer whale" : "orca",
            "jellyfish" : "medusa",
            "lobster" : "langosta",
            "manta ray" : "mantarraya",
            "octopus" : "pulpo",
            "oyster" : "ostra",
            "almeja" : "clam",
            "seal" : "foca",
            "sea turtle" : "tortuga marina",
            "sea lion" : "león marino",
            "squid" : "calamar",
            "cuttlefish" : "sepia",
            "seahorse" :  "caballito de mar",
            "starfish" : "estrella de mar",
            "hake" : "merluza",
            "gilt-head bream" : "dorada",
            "sardine" : "sardina",
            "tunafish" : "atún",
            "cod" : "bacalao",
            "bass" : "lubina",
            "trout" : "trucha",
            "salmon" : "salmón",
            "boar" : "jabalí",
            "mouse" : "ratón", 
            "racoon" : "mapache",
            "skunk" : "mofeta",
            "squirrel" : "ardilla",
            "beaver" : "castor",
            "otter" : "nutria",
            "armadillo" : "armadillo",
            "bat" : "murciélago",
            "bear" : "oso",
            "weasel" : "comadreja",
            "moose": "alce",
            "falcon" : "halcón",
            "eagle" : "águila",
            "vulture" : "buitre",
            "hummingbird" : "colibrí",
            "sparrow" : "gorrión",
            "crow" : "cuervo",
            "owl" : "búho",
            "stork" : "cigüeña",
            "swan" : "cisne",
            "duck" : "pato",
            "pigeon" : "paloma",
            "fly" : "mosca",
            "butterfly" : "mariposa",
            "dragonfly" : "libélula",
            "grasshopper" : "saltamontes",
            "ladybug" : "mariquita",
            "mosquito" : "mosquito",
            "moth" : "polilla",
            "snail" : "caracol",
            "spider" : "araña", 
            "wasp" : "avispa",
            "ant" : "hormiga",
            "bee" : "abeja",
            "beetle" : "escarabajo",
            "worm" : "gusano",
            "cockroach" : "cucaracha",
            "ape" : "simio",
            "monkey" : "mono",
            "baboon" : "babuino",
            "cobra" : "cobra",
            "chimpanzee" : "chimpancé",
            "gorilla" : "gorila",
            "panda bear" : "oso panda",
            "sloth": "perezoso",
            "parrot" : "loro",
            "tiger" : "tigre",
            "boa"  : "boa", 
            "python" : "pitón",
            "goldfish" : "pezdorado",
            "hamster" : "hámster",
            "canary" : "canario",
            "cat" : "gato",
            "dog" : "perro",
            "buffalo" : "búfalo",
            "cheetah" : "guepardo",
            "leopard" : "leopardo",
            "elephant" : "elefante",
            "giraffe" : "jirafa",
            "hyena" : "hiena",
            "kangaroo" : "canguro",
            "koala" : "koala",
            "ostrich" : "avestruz",
            "rhinoceros" : "rinoceronte",
            "lion" : "león",
            "zebra" : "cebra",
            "antelope" : "antílope",
            "flamingo" : "flamenco",
            "frog" : "rana",
            "toad" : "sapo",
            "hippopotamus" : "hipopótamo",
            "crocodile" : "cocodrilo",
            "alligator" : "caimán",
            "duck" : "pato",
            "turtle" : "tortuga",
            "camel" : "camello",
            "dromedary" : "dromedario",
            "penguin" : "pingüino",
            "polar bear" : "oso polar",
            "walrus" : "morsa",
            "rattlesnake" : "serpiente cascabel",
            "scorpion" : "escorpión",
            "tortoise" : "tortuga de tierra",
            "snake" : "serpiente",
            "lizard" : "lagarto",
            "iguana" : "iguana",
            "chameleon" : "camaleón",
            "dragon" : "dragón",
              
    }    



adjectives2 = {"angry" : "enfadado", "sad" : "triste", "hungry" : "hambriento",
                   "sleepy" : "somnoliento", "exhausted" : "exhausto",
                   "awake" : "despierto", "asleep" : "dormido", "hot" : "caliente",
                   "warm" : "caluroso", "wet" : "mojado", "dry" : "seco",
                   "full" : "lleno", "empty" : "vacío"}


numbers = {"one":"uno",
           "two":"dos",
           "three":"tres",
           "four":"cuatro",
           "five":"cinco",
           "six":"seis",
           "seven":"siete",
           "eight":"ocho",
           "nine":"nueve",
           "ten":"diez",
           "eleven":"once",
           "twelve":"doce",
           "thirteen":"trece",
           "fourteen":"catorce",
           "fifteen":"quince", 
           "sixteen":"dieciséis",
           "seventeen":"diecisiete",
           "eighteen":"dieciocho", 
           "nineteen":"diecinueve",
           "twenty":"veinte",
           "twenty  one":"veintiuno",
           "twenty  two":"veintidós",
           "twenty  three":"veintitrés",
           "twenty  four":"veinticuatro",
           "twenty  five":"veinticinco",
           "twenty  six":"veintiséis",
           "twenty  seven":"veintisiete",
           "twenty  eight":"veintiocho",
           "twenty  nine":"veintinueve",
           "thirty":"treinta",
           "thirty  one":"treinta y uno",
           "thirty  two":"treinta y dos",
           "thirty  three":"treinta y tres",
           "thirty  four":"treinta y cuatro",
           "thirty  five":"treinta y cinco",
           "thirty  six":"treinta y seis",
           "thirty  seven":"treinta y siete",
           "thirty  eight":"treinta y ocho",
           "thirty  nine":"treinta y nueve",
           "forty":"cuarenta",
           "forty  one":"cuarenta y uno",
           "forty  two":"cuarenta y dos",
           "forty  three":"cuarenta y tres",
           "forty  four":"cuarenta y cuatro",
           "forty  five":"cuarenta y cinco",
           "forty  six":"cuarenta y seis",
           "forty  seven":"cuarenta y siete",
           "forty  eight":"cuarenta y ocho",
           "forty  nine":"cuarenta y nueve",
           "fifty":"cincuenta",
           "fifty  one":"cincuenta y uno",
           "fifty  two":"cincuenta y dos",
           "fifty  three":"cincuenta y tres",
           "fifty  four":"cincuenta y cuatro",
           "fifty  five":"cincuenta y cinco",
           "fifty  six":"cincuenta y seis",
           "fifty  seven":"cincuenta y siete",
           "fifty  eight":"cincuenta y ocho",
           "fifty  nine":"cincuenta y nueve",
           "sixty":"sesenta",
           "sixty  one":"sesenta y uno",
           "sixty  two":"sesenta y dos",
           "sixty  three":"sesenta y tres",
           "sixty  four":"sesenta y cuatro",
           "sixty  five":"sesenta y cinco",
           "sixty  six":"sesenta y seis",
           "sixty  seven":"sesenta y siete",
           "sixty  eight":"sesenta y ocho",
           "sixty  nine":"sesenta y nueve",
           "seventy":"setenta",
           "seventy  one":"setenta y uno",
           "seventy  two":"setenta y dos",
           "seventy  three":"setenta y tres",
           "seventy  four":"setenta y cuatro",
           "seventy  five":"setenta y cinco",
           "seventy  six":"setenta y seis",
           "seventy  seven":"setenta y siete",
           "seventy  eight":"setenta y ocho",
           "seventy  nine":"setenta y nueve",
           "eighty":"ochenta",
           "eighty  one":"ochenta y uno",
           "eighty  two":"ochenta y dos",
           "eighty  three":"ochenta y tres",
           "eighty  four":"ochenta y cuatro",
           "eighty  five":"ochenta y cinco",
           "eighty  six":"ochenta y seis",
           "eighty  seven":"ochenta y siete",
           "eighty  eight":"ochenta y ocho",
           "eighty  nine":"ochenta y nueve",
           "ninety":"noventa",
           "ninety  one":"noventa y uno",
           "ninety  two":"noventa y dos",
           "ninety  three":"noventa y tres",
           "ninety  four":"noventa y cuatro",
           "ninety  five":"noventa y cinco",
           "ninety  six":"noventa y seis",
           "ninety  seven":"noventa y siete",
           "ninety  eight":"noventa y ocho",
           "ninety  nine":" noventa y nueve",
           "one hundred":"cien"
           }


common100Verbs = {"accept":"aceptar",
    "admit":"admitir",
    "answer":"responder",
    "ask":"preguntar",
    "begin":"comenzar",
    "believe":"creer",
    "belong":"pertenecer",
    "break":"romper",
    "bring":"traer",
    "buy":"comprar",
    "call":"llamar",
    "can":"poder",
    "cancel":"cancelar",
    "change":"cambiar",
    "clean":"limpiar",
    "close":"cerrar",
    "complain":"quejar",
    "cook":"cocinar",
    "count":"contar",
    "cry":"llorar",
    "cut":"cortar",
    "dance":"bailar",
    "decide":"decidir",
    "draw":"dibujar",
    "drink":"beber",
    "drive":"conducir",
    "eat":"comer",
    "explain":"explicar",
    "fall":"caer",
    "fight":"pelear",
    "fill":"llenar",
    "find":"encontrar",
    "finish":"terminar",
    "fix":"reparar",
    "fly":"volar",
    "follow":"seguir",
    "forget":"olvidar",
    "forgive":"perdonar",
    "give":"dar",
    "go":"ir",
    "hate":"odiar",
    "have":"tener",
    "hear":"escuchar",
    "hide":"esconder",
    "know":"saber",
    "learn":"aprender",
    "leave":"dejar",
    "listen":"escuchar",
    "like":"vivir",
    "live":"vivir",
    "look":"mirar",
    "lose":"perder",
    "love":"amar",
    "make/do":"hacer",
    "need":"necesitar",
    "open":"abrir",
    "order":"ordenar",
    "organize":"organizar",
    "pay":"pagar",
    "play":"jugar",
    "put":"poner",
    "rain":"llover",
    "read":"leer",
    "remember":"recordar",
    "run":"correr",
    "say":"decir",
    "see":"ver",
    "sell":"vender",
    "send":"enviar",
    "sign":"firmar",
    "sing":"cantar",
    "sit":"sentar",
    "sleep":"dormir",
    "smile":"sonreír",
    "smoke":"fumar",
    "speak":"hablar",
    "spend":"gastar",
    "stand":"parar",
    "start":"iniciar",
    "stop":"parar",
    "study":"estudiar",
    "swim":"nadar",
    "take":"agarrar",
    "talk":"charlar",
    "teach":"enseñar",
    "tell":"decir",
    "think":"pensar",
    "touch":"tocar",
    "translate":"traducir",
    "travel":"viajar",
    "try":"intentar",
    "type":"escribir",
    "understand":"entender",
    "use":"usar",
    "wait":"esperar",
    "walk":"caminar",
    "want":"querer",
    "watch":"observar",
    "work":"trabajar",
    "worry":"preocupar",
    "write":"escribir"
    }



generateLikeFruitSentences(listOfWords,common100Verbs)

