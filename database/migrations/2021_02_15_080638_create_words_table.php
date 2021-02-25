<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWordsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('words', function (Blueprint $table) {
            $table->increments('id');
			$table->integer('user_id')->index();
			$table->integer('dictionaries_id')->nullable()->index();
			$table->string('name', 100)->nullable();
            $table->text('predefinition')->nullable();
            $table->text('definition')->nullable();
			$table->text('synonyms')->nullable();
            $table->text('antonyms')->nullable();
            $table->text('paronime')->nullable();
			$table->text('other')->nullable();
            $table->boolean('active')->default(false);
            $table->timestamps();
			$table->softDeletes();
			
        });
    }

}
