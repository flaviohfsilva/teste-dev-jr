import { Inject, Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { Repository } from 'typeorm';
import { User } from 'src/core/entities/User.entity';
import { Retorno, RetornoError } from 'src/interface';
import { Workbook } from 'exceljs';
import { Response } from 'express';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly UserRP: Repository<User>,
  ) {}

  // =========================== CREATE USER ===========================
  async create(createUserDto: CreateUserDto) {
    // Definindo e inicializando objetos de retorno
    const retornoError: RetornoError = {
      erro: false,
      user: [],
      status: '',
    };

    const retorno: Retorno = {
      id: 0,
      nomeCompleto: '',
      email: '',
      status: '',
    };

    try {
      createUserDto.status = 'Created';
      const user = await this.UserRP.create(createUserDto);

      // Salva as alterações no banco de dados
      await this.UserRP.save(user);

      // Atribuindo os dados aos campos do objeto do retorno
      retorno.id = user.id;
      retorno.nomeCompleto = user.nomeCompleto;
      retorno.email = user.email;
      retorno.status = user.status;

      console.log((retorno.id = user.id));

      return retorno;
    } catch (error) {
      retornoError.erro = true;
      retornoError.status = `Erro ao criar usuário ${error}`;
      return retornoError;
    }
  }

  // =========================== FIND ALL USER ===========================
  async findAll() {
    // Definindo e inicializando objetos de retorno
    const retornoError: RetornoError = {
      erro: false,
      status: '',
    };

    try {
      // Fazendo a busca ao banco de dados
      const user = await this.UserRP.find({
        where: { excluido: false },
        select: ['id', 'nomeCompleto', 'email', 'status'], // Selecionando os campos para o retorno,fazendo com que o campo 'excluido' não apareça.
      });

      return user;
    } catch (error) {
      retornoError.erro = true;
      retornoError.status = `Erro ao buscar usuários ${error}`;
      return retornoError;
    }
  }

  // =========================== FIND ALL DELETED USER ===========================
  async findAllDeleted() {
    // Definindo e inicializando objetos de retorno
    const retornoError: RetornoError = {
      erro: false,
      status: '',
    };

    try {
      // Fazendo a busca ao banco de dados
      const user = await this.UserRP.find({
        where: { excluido: true },
        select: ['id', 'nomeCompleto', 'email', 'status'], // Selecionando os campos para o retorno,fazendo com que o campo 'excluido' não apareça.
      });

      return user;
    } catch (error) {
      retornoError.erro = true;
      retornoError.status = `Erro ao buscar usuários ${error}`;
      return retornoError;
    }
  }

  // =========================== FIND ONE USER ===========================
  async findOne(id: number) {
    // Definindo e inicializando objetos de retorno
    const retornoError: RetornoError = {
      erro: false,
    };

    const retorno: Retorno = {
      id: 0,
      nomeCompleto: '',
      email: '',
    };

    try {
      // Fazendo a busca ao banco de dados
      const user = await this.UserRP.findOne({
        where: {
          id: id,
          excluido: false,
        },
      });

      // Atribuindo os dados aos campos do objeto do retorno
      retorno.id = user.id;
      retorno.nomeCompleto = user.nomeCompleto;
      retorno.email = user.email;

      return retorno;
    } catch (error) {
      retornoError.erro = true;
      retornoError.status = `Esse usuário não existe! ${error}`;
      return retornoError;
    }
  }

  // =========================== UPDATE USER ===========================
  async update(id: number, updateUserDto: UpdateUserDto) {
    // Definindo e inicializando objetos de retorno
    const retornoError: RetornoError = {
      erro: false,
      status: '',
    };

    const retorno: Retorno = {
      id: 0,
    };

    try {
      await this.UserRP.update(id, updateUserDto);
      const userUpdated = await this.UserRP.findOne({
        where: { id: id },
      });

      // Modifica o status para 'Updated'.
      userUpdated.status = 'Updated';

      // Salva as alterações no banco de dados
      this.UserRP.save(userUpdated);

      // Atribuindo os dados no objeto de retorno
      retorno.id = userUpdated.id;
      retorno.nomeCompleto = userUpdated.nomeCompleto;
      retorno.email = userUpdated.email;
      retorno.status = userUpdated.status;

      return retorno;
    } catch (error) {
      retornoError.erro = true;
      retornoError.status = `Erro ao remover usuário ${error}`;
    }
  }

  // =========================== REMOVE USER ===========================
  async remove(id: number) {
    // Definindo e inicializando objetos de retorno
    const retornoError: RetornoError = {
      erro: false,
      status: '',
    };

    const retorno: Retorno = {
      id: 0,
    };

    try {
      const userDeleted = await this.UserRP.findOne({
        where: { id: id },
      });

      // Modifica o status para 'deleted' e o campo 'exlcuido' para true.
      userDeleted.excluido = true;
      userDeleted.status = 'Deleted';

      // Salva as alterações no banco de dados
      this.UserRP.save(userDeleted);

      // Atribuindo os dados no objeto de retorno
      retorno.id = userDeleted.id;
      retorno.status = userDeleted.status;

      return retorno;
    } catch (error) {
      retornoError.erro = true;
      retornoError.status = `Erro ao remover usuário ${error}`;
    }
  }

  // =========================== EXPORT USER DATA TO EXCEL ===========================
  async exportUserToExcel(id: number, res: Response) {
    const retornoError: RetornoError = {
      erro: false,
      status: '',
    };

    try {
      const user = await this.UserRP.findOne({
        where: {
          id: id,
          excluido: false,
        },
      });

      if (!user) {
        retornoError.erro = true;
        retornoError.status = `Usuário não encontrado!`;
        return retornoError;
      }

      // Criar uma nova instância de workbook
      const workbook = new Workbook();

      // Adiciona o nome da página
      const worksheet = workbook.addWorksheet('Dados do Usuário');

      worksheet.addRow([]);

      worksheet.addRow(['CONTROL MANAGER - RELATÓRIO DO USUÁRIO']);

      worksheet.addRow([]);

      // Adicionar uma linha com os dados do usuário
      worksheet.addRow(['ID', user.id]);
      worksheet.addRow(['NOME', user.nomeCompleto]);
      worksheet.addRow(['EMAIL', user.email]);
      worksheet.addRow(['STATUS', user.status]);

      // Definir o cabeçalho

      // Especifica o tipo de conteúdo da resposta para gerar o donwload do arquivo
      res.setHeader(
        'Content-Disposition',
        'attachment; filename=user-data.xlsx',
      );

      // Especifica que o conteúdo da resposta é um arquivo Excel
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      );

      // Enviar o arquivo para o cliente
      await workbook.xlsx.write(res);

      // Finalizar a resposta
      res.end();
    } catch (error) {
      retornoError.erro = true;
      retornoError.status = `Erro ao exportar dados do usuário ${error}`;
      return retornoError;
    }
  }
}
