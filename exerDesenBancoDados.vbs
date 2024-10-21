'Backup com robocopy - Marcell, Manaus 26 de Abril de 2022. >> ��� Windows 1252
' on error resume next
option explicit
dim objshell:   set objshell = WScript.CreateObject("Wscript.shell")
dim fso:        Set fso      = CreateObject("Scripting.FileSystemObject")
dim strWeekday, valWeekday, strBackup, strOrigem, strDestino, driverUnidade, chave01, path, valMonth, caminho
dim currentPath: currentPath   = Left(wscript.scriptFullName,len(wscript.scriptFullName)-len(wscript.scriptName))

' Banco de dados
ObjShell.run "cmd /K CD C:\ & color 03 & cd " & currentPath & " & npm run serverUsers", 1 '1 mostra | 0 nao mostra

Wscript.Quit












' PROLAM infobobinas ( C:\sys\app\prolam\infobobinas\infobobinas\app ) Marcell
' PROLAM infobobinas ( C:\system\app ) Marcell
' ObjShell.run "cmd /K CD C:\ & color 02 & cd sys\app\prolam\infobobinas\infobobinas\app", 1
' ObjShell.run "cmd /K CD C:\ & color 02 & cd sys\app\prolam\infobobinas\infobobinas\app & npm start", 1, true '1 mostra | 0 nao mostra | não deixar ir para outro comando
' ObjShell.run "cmd /K CD C:\ & color 02 & cd sys\app\prolam\infobobinas\infobobinas\app & npm run server", 1, true '1 mostra | 0 nao mostra


myMonth(): myWeekday(): whatDrive(): myBackup()

Function myWeekday()
    strWeekday = Weekday(Now)
    select case strWeekday
        case 1: valWeekday = "Domingo"
        case 2: valWeekday = "Segunda"
        case 3: valWeekday = "Terca"
        case 4: valWeekday = "Quarta"
        case 5: valWeekday = "Quinta"
        case 6: valWeekday = "Sexta"
        case 7: valWeekday = "Sabado"
    end select 
End Function

Function whatDrive()
    chave01=0
     If fso.FolderExists("D:\"&valWeekday) then driverUnidade="D:\"&valWeekday: chave01=1: end if
    ' If fso.FolderExists("E:\"&valWeekday) then driverUnidade="E:\"&valWeekday: chave01=1: end if
    if chave01=0 then: If fso.FolderExists("E:\"&valWeekday) then driverUnidade="E:\"&valWeekday: chave01=1: end if: end if
    if chave01=0 then: If fso.FolderExists("F:\"&valWeekday) then driverUnidade="F:\"&valWeekday: chave01=1: end if: end if
    if chave01=0 then: If fso.FolderExists("G:\"&valWeekday) then driverUnidade="G:\"&valWeekday: chave01=1: end if: end if
End Function

Function myBackup()
        strOrigem = "": strDestino = ""
        strBackup = "robocopy M:\ "&driverUnidade&"\ /e /b /r:7 /w:5 /xf ~*.* /xd DfsrPrivate /log:C:\temp\RoboCopy\log\backup_"&year(date)&"_M"&right("0"&Month(date),2)&"_D"&right("0"&Day(date),2)&"x_"&valWeekday&".log /TEE /V"
        if chave01=0 then
            ' WScript.Echo "ERRO: "&strBackup
        else
            ObjShell.run "cmd /K CD C:\ & color 03 & "&strBackup& " & exit", 1, true '1 mostra | 0 nao mostra
        end if
End Function

Function myMonth()
    select case Month(now)
        case 1: valMonth = "Jan"
        case 2: valMonth = "Fev"
        case 3: valMonth = "Mar"
        case 4: valMonth = "Abr"
        case 5: valMonth = "Mai"
        case 6: valMonth = "Jun"
        case 7: valMonth = "Jul"
        case 8: valMonth = "Ago"
        case 9: valMonth = "Set"
        case 10: valMonth = "Out"
        case 11: valMonth = "Nov"
        case 12: valMonth = "Dez"
    end select
    path="C:\temp\RoboCopy\log\"&right("0"&Month(now),2)&valMonth
    If not fso.FolderExists(path) then
        fso.CreateFolder(path)
    end if
End Function

' WScript.Echo strBackup
' ObjShell.run "cmd /K CD C:\ & Dir", 1, true '1 mostra | 0 nao mostra
' WScript.Echo "Sabado"

' REFERENCIAS:
' https://eranier.webnode.com.br/news/executar-comando-do-prompt-dentro-do-vbs/
' https://ss64.com/vb/syntax-getdatetime.html
