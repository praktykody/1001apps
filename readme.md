# 1001projects

## Klonowanie APP
1. Proste: 
- Otwórz VSC, kliknij "F1", a następnie wpisz "GIT CLONE"
- kliknij na opcję "Clone from github", i wpisz taicoders/1001apps

2. Szybsza opcja
- w terminalu wpisz
```git 
  git clone https://github.com/taicoders/1001apps
``` 

## TWORZENIE GAŁĘZI 
  1. W VSC kliknij w lewym dolnym rogu na "master"
  2. Kliknij na "Create new branch",
  3. Wpisz swoje imię i potwierdź enterem.

## TWORZENIE PROJEKTÓW. 
  1. Otwórz 1001apps i folder z kursu.
  2. Do konkretnych folderów app wrzuć odpowiadające im foldery z kursu
  3. Zmień nazwy na swoje imię

## MERGE MASTERA
**PRZED WPROWADZENIEM TYCH ZMIAN KONIECZNIE ZRÓB COMMIT**
1. Przejdź na swoją branch (gałąź), wejdź do source control -> trzy kropeczki nad message (komunikat) -> branch (gałąź) -> merge branch (scal gałąź)
2. Wybierz gałąź master (wciągnij wszytkie zmiany z mastera na swoją gałąź jednocześnie nie zmieniając wprowadzonych zmian na gałęzi)  

## MERGE WHOLE REPO
git subtree add --prefix=portfolio https://github.com/apietryga/apietryga.github.io master
