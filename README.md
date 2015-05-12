<<<<<<< HEAD
Tulipa Checkout
===============

Necessário  a instalação do módulo de css less:

http://www.magentocommerce.com/magento-connect/lesscss.html

Adicione a linha a seguir no arquivo page.xml mais ou menos linha 60:

<action method="addCss"><stylesheet>css/tulipa-checkout.less</stylesheet></action>

LIMPAR CACHE E REINDEXAR!!!!
Não esqueça de habilitar o módulo na opção GERAL (abaixo de Gerenciador de conteúdo)

No phpmyadmin na tabela eav_attribute edite a linha attribute_code = "telephone" e mude o valor de 1 para 0 e salve. Agora na tabela customer_eav_attribute ache a linha com mesmo attribute_id do item anterior (31) e mude o valor da coluna validation_rules para NULL.

Projeto baseado no One Step Checkout. Implementamos recursos para atender às nossas necessidades.
=======
# tulipa-checkout
Tulipa Checkout - tradicional

Adaptação do módulo OSC Brasil.
>>>>>>> origin/master
